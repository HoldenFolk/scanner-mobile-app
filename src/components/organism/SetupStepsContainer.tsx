import React from 'react';
import {
	SuccessMsg,
	ErrorMsg,
	Verifier,
	Writer,
} from '../molecule/sendingConfigSteps';
import { View } from '../atomic/View';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigState, setConfigState } from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '@/types/navigation';
import { routes } from '@/navigation/routes';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';
import { ProgressGrouped } from '../molecule/ProgressGrouped';
import styled from 'styled-components/native';

interface SetupStepsContainerProps {
	bleId: string;
}

const ContainerView = styled(View)`
	flex-grow: 1;
`;

const InnerView = styled(View)`
	padding: 8px;
	padding-top: 24px;
	justify-content: space-around;
	align-items: center;
	flex-grow: 1;
`;

export function SetupStepsContainer({ bleId }: SetupStepsContainerProps) {
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const dispatch = useDispatch();
	const status = useSelector(getConfigState);
	const { isScannerConnected, disconnectFromScanner } = useBluetoothConnect();

	const errorMsg = 'Connection Cancelled';

	const handleError = async (err: Error) => {
		console.debug(`SetupStepsContainer:56 handleError: ${err?.message}`);

		// disconnect for failure. change the message if cannot disconnect
		const isConnected = await isScannerConnected(bleId);
		if (isConnected) {
			const isDisconnected = await disconnectFromScanner(bleId);
			if (!isDisconnected) {
				console.debug('Failed to disconnect BLE device');
				const nextErrMsg =
					' Failed to disconnect BLE device. Please close the app and retry';
				err.message = nextErrMsg;
			}
			dispatch(setConfigState(AsyncLifecycle.REJECTED));
		}
	};

	const handleClose = async () => {
		routes.Home(navigation);
	};

	const handleCancel = async () => {
		await disconnectFromScanner(bleId);
		routes.Home(navigation);
	};

	const handleConnected = () => {
		dispatch(setConfigState(AsyncLifecycle.FULFILLED));
		console.log('Scanner Connected');
	};

	return (
		<ContainerView accessibilityLabel={'Setup Screen'} testID="Setup Screen">
			<InnerView>
				{status === AsyncLifecycle.PENDING && (
					<Writer
						bleId={bleId}
						onFulfilled={() => {
							dispatch(setConfigState(AsyncLifecycle.VERIFYING));
							console.log('Writer fulfilled');
						}}
						onRejected={handleError}
						shouldStart={status === AsyncLifecycle.PENDING}
					/>
				)}
				{status === AsyncLifecycle.VERIFYING && (
					<Verifier
						bleId={bleId}
						onFulfilled={handleConnected}
						onRejected={handleError}
						startPolling={status === AsyncLifecycle.VERIFYING}
					/>
				)}
				{status === AsyncLifecycle.REJECTED && (
					<ErrorMsg error={errorMsg} onClose={handleClose} />
				)}
				{status === AsyncLifecycle.FULFILLED && (
					<SuccessMsg onConfirm={handleClose} />
				)}
				{status !== AsyncLifecycle.FULFILLED &&
					status !== AsyncLifecycle.REJECTED && (
						<ProgressGrouped /* shows ProgressTimer */
							shouldShow={true}
							onCancel={handleCancel}
						/>
					)}
			</InnerView>
		</ContainerView>
	);
}

import React from 'react';
import {
	SuccessMsg,
	ErrorMsg,
	Verifier,
	Writer,
} from '../molecule/sendingConfigSteps';
import { View } from '../atomic/View';
import { useDispatch } from 'react-redux';
import { setConfigState } from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';
import { ProgressGrouped } from '../molecule/ProgressGrouped';
import styled from 'styled-components/native';
import { useSetupStepsContainer } from '@/hooks/useSetupStepsContainer';

interface SetupStepsContainerProps {
	bleId: string;
	macAddress: string;
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

export function SetupStepsContainer({
	bleId,
	macAddress,
}: SetupStepsContainerProps) {
	const dispatch = useDispatch();
	const {
		handleError,
		handleClose,
		handleCancel,
		handleConnected,
		errorMsg,
		status,
	} = useSetupStepsContainer(bleId);

	return (
		<ContainerView accessibilityLabel={'Setup Screen'} testID="Setup Screen">
			<InnerView>
				{status === AsyncLifecycle.PENDING && (
					<Writer
						bleId={bleId}
						macAddress={macAddress}
						onFulfilled={() => {
							dispatch(setConfigState(AsyncLifecycle.VERIFYING));
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

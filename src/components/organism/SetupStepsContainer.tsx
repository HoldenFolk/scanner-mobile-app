import React from 'react';
import { tailwind } from '@kaidu/shared/lib/styles';
import { ProgressGrouped } from './ProgressGrouped';
import { SuccessMsg, ErrorMsg, Retriever, Verifier, Writer } from './Steps';
import { View } from '../atomic/View';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigState, setConfigState } from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';

/**
 * for existing and new devices
 */
function getWritingInputs(macAddress, data, wifi_ssid, wifi_password) {
	if (data) {
		return { ...data, mac_address: macAddress, wifi_ssid, wifi_password };
	} else {
		return { mac_address: macAddress, wifi_ssid, wifi_password };
	}
}

export function SetupStepsContainer({
	bleId,
	macAddress,
	customerId,
	device_name,
}) {
	const dispatch = useDispatch();
	const status = useSelector(getConfigState);
	const errorMsg = 'Cancelled by user';

	const handleError = async (err: Error) => {
		console.debug(`SetupStepsContainer:56 handleError: ${err?.message}`);

		// disconnect for failure. change the message if cannot disconnect
		const isConnected = await isDeviceConnected(bleId);
		if (isConnected) {
			const isDisconnected = await cancelConnection(bleId);
			if (!isDisconnected) {
				console.debug('Failed to disconnect BLE device');
				const nextErrMsg =
					' Failed to disconnect BLE device. Please close the app and retry';
				err.message = nextErrMsg;
			}
		}

		const plugState = lastPlugState;
		const doneSetupState = {
			name: device_name,
			state: AsyncLifecycle.REJECTED,
			bleId,
			plugState,
		};
		dispatch(updateSetup(doneSetupState));
		dispatch(cleanUpScannedDevices()); //XXXDC added
		setProgress(false); //XXXDC added to stop progress-timer
		setData(null);
		if (err) {
			setError(err.message);
		}
		setStatus('rejected');
	};

	return (
		<View
			style={tailwind('flex-grow')}
			accessibilityLabel={'Setup Screen'}
			testID="Setup Screen"
		>
			<View style={tailwind('p-2 pt-6 justify-around items-center flex-grow')}>
				{status === 'idle' && (
					<Retriever
						macAddress={macAddress}
						customerId={customerId}
						device_name={device_name}
						onFulfilled={() => {
							dispatch(setConfigState(AsyncLifecycle.PENDING));
							return;
						}}
						onRejected={handleError}
					/>
				)}
				{status === AsyncLifecycle.PENDING && (
					<Writer
						bleId={bleId}
						onFulfilled={() =>
							dispatch(setConfigState(AsyncLifecycle.VERIFYING))
						}
						onRejected={handleError}
						shouldStart={status === AsyncLifecycle.PENDING}
					/>
				)}
				{status === AsyncLifecycle.VERIFYING && (
					<Verifier
						bleId={bleId}
						macAddress={macAddress}
						onUpdated={handleUpdate}
						onFulfilled={handleConnected}
						onRejected={handleError}
						wifi={wifiInput}
					/>
				)}
				{status === 'rejected' ? (
					<ErrorMsg
						error={errorMsg}
						onRetry={() => {
							setStatus('idle'); //start from beginning
						}}
						bleId={bleId}
						onClose={handleClose}
					/>
				) : null}
				{status === 'connected' ? (
					<SuccessMsg bleId={bleId} onClose={handleClose} />
				) : null}
				<ProgressGrouped /* shows ProgressTimer */
					shouldShow={progressState /* was status !== 'rejected' */}
					onCancel={handleCancel}
				/>
			</View>
		</View>
	);
}

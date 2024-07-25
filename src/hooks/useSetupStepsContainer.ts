import { getConfigState, setConfigState } from '@/providers/redux/slices';
import { useDispatch, useSelector } from 'react-redux';
import { useBluetoothConnect } from './useBluetoothConnect';
import { AsyncLifecycle } from '@/types/scannerData';
import useAppNavigation from './useAppNavigation';

export const useSetupStepsContainer = (bleId: string) => {
	const dispatch = useDispatch();
	const status = useSelector(getConfigState);

	const { isScannerConnected, disconnectFromScanner } = useBluetoothConnect();
	const { Home } = useAppNavigation();

	const errorMsg = 'Connection Cancelled';

	// TODO: Implement better error handling here
	const handleError = async (err: Error) => {
		dispatch(setConfigState(AsyncLifecycle.REJECTED));
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
		}
	};

	const handleClose = async () => {
		dispatch(setConfigState(AsyncLifecycle.IDLE));
		Home();
	};

	const handleCancel = async () => {
		await disconnectFromScanner(bleId);
		dispatch(setConfigState(AsyncLifecycle.IDLE));
		Home();
	};

	const handleConnected = async () => {
		await disconnectFromScanner(bleId);
		dispatch(setConfigState(AsyncLifecycle.FULFILLED));
	};

	return {
		handleClose,
		handleCancel,
		handleConnected,
		handleError,
		status,
		errorMsg,
	};
};

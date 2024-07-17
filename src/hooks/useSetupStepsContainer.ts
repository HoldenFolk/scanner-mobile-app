import { routes } from '@/navigation/routes';
import { getConfigState, setConfigState } from '@/providers/redux/slices';
import { RootParamList } from '@/types/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useBluetoothConnect } from './useBluetoothConnect';
import { AsyncLifecycle } from '@/types/scannerData';

export const useSetupStepsContainer = (bleId: string) => {
	const dispatch = useDispatch();
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
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

	return {
		handleClose,
		handleCancel,
		handleConnected,
		handleError,
		status,
		errorMsg,
	};
};

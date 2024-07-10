import { setConnectedDeviceId, setConnecting } from '@/providers/redux/slices';
import BleManager from 'react-native-ble-manager';
import { useDispatch } from 'react-redux';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();

	const retreiveServices = async (id: string) => {
		try {
			const services = await BleManager.retrieveServices(id);
			console.log('Retrieved services:', JSON.stringify(services, null, 2));
		} catch (error) {
			console.error('Failed to retrieve services:', error);
		}
	};

	const connectToScanner = async (id: string) => {
		try {
			dispatch(setConnecting(true));
			await BleManager.connect(id);
			console.log('Connected to scanner:', id);
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(id));

			// await retreiveServices(id);
		} catch (error) {
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(''));
			console.error('Failed to connect to scanner:', id, error);
		}
	};
	const disconnectFromScanner = async (id: string) => {
		try {
			dispatch(setConnecting(true));
			await BleManager.disconnect(id);
			console.log('Disconnected from scanner:', id);
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(''));
		} catch (error) {
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(''));
			console.error('Failed to disconnect from scanner:', id, error);
		}
	};

	return { connectToScanner, disconnectFromScanner };
};

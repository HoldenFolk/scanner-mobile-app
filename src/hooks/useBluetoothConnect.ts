import { setConnectedDeviceId, setConnecting } from '@/providers/redux/slices';
import { ScannerData } from '@/types/scannerData';
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

	const connectToScanner = async (scanner: ScannerData) => {
		try {
			const { id } = scanner;
			dispatch(setConnecting(true));
			await BleManager.connect(id);
			console.log('Connected to scanner:', id);
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(id));

			await retreiveServices(id);
		} catch (error) {
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(''));
			console.error('Failed to connect to scanner:', scanner.id, error);
		}
	};

	return { connectToScanner };
};

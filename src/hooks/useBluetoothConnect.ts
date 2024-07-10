import { setConnectedDeviceId, setConnecting } from '@/providers/redux/slices';
import BleManager from 'react-native-ble-manager';
import { useDispatch } from 'react-redux';
import settings from '@/globalConstants';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();

	const retreiveServices = async (id: string) => {
		try {
			const services = await BleManager.retrieveServices(id);
			console.log('Retrieved services:');
			return services;
		} catch (error) {
			console.error('Failed to retrieve services:', error);
		}
	};

	const readCharacteristic = async (
		id: string,
		service: string,
		characteristic: string,
	) => {
		try {
			await retreiveServices(id);
			const data = await BleManager.read(id, service, characteristic);
			console.log('Read characteristic:', JSON.stringify(data, null, 2));
			return data;
		} catch (error) {
			console.error('Failed to read characteristic:', error);
		}
	};

	const connectToScanner = async (id: string) => {
		try {
			dispatch(setConnecting(true));
			await BleManager.connect(id);
			console.log('Connected to scanner:', id);
			dispatch(setConnecting(false));
			dispatch(setConnectedDeviceId(id));

			const response = await readCharacteristic(
				id,
				settings.serviceID,
				settings.characteristicIDReadWifi,
			);

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

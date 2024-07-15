import {
	resetConnectedScanner,
	setConnectedDeviceId,
	setConnecting,
	setConnectedDeviceWifiList,
	setLoadingWifiList,
} from '@/providers/redux/slices';
import BleManager from 'react-native-ble-manager';
import { useDispatch } from 'react-redux';
import settings from '@/globalConstants';
import { Wifi } from '@/types/scannerData';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();

	const retrieveWifiList = async (id: string) => {
		dispatch(setLoadingWifiList(true));
		const wifiList: Wifi[] = [];

		let isUniqueSSID = true;
		do {
			const data = await readCharacteristicToString(
				id,
				settings.serviceID,
				settings.characteristicIDReadWifi,
			);

			if (!data) continue;

			const resultString = String.fromCharCode.apply(null, data);
			const [ssid, rssi] = resultString.split('\t').map(item => item.trim());
			const wifi = { ssid, rssi: rssi.slice(0, 3) };

			isUniqueSSID = !wifiList.some(item => item.ssid === ssid);
			if (isUniqueSSID) {
				wifiList.push(wifi);
			}
		} while (isUniqueSSID);
		dispatch(setConnectedDeviceWifiList(wifiList));
		dispatch(setLoadingWifiList(false));
		console.log('Retrieved wifi list:', wifiList);
	};

	const retreiveServices = async (id: string) => {
		try {
			const services = await BleManager.retrieveServices(id);
			console.log('Retrieved services:');
			return services;
		} catch (error) {
			console.error('Failed to retrieve services:', error);
		}
	};

	const readCharacteristicToString = async (
		id: string,
		service: string,
		characteristic: string,
	) => {
		try {
			const data = await BleManager.read(id, service, characteristic);
			return data;
		} catch (error) {
			console.error('Failed to read characteristic:', error);
		}
	};

	const connectToScanner = async (id: string) => {
		let isConnected = false;
		let attempts = 0;
		dispatch(setConnecting(true));
		// Attempt to connect to the scanner up to 3 times
		while (!isConnected && attempts < 3) {
			try {
				await BleManager.connect(id);
				console.log('Connected to scanner:', id);
				isConnected = true; // Update flag to exit loop
			} catch (error) {
				console.warn('Failed to connect to scanner, retrying:', id, error);
				attempts++;
			}
		}
		// Proceed with the rest of the function after successful connection
		try {
			dispatch(setConnectedDeviceId(id));
			await retreiveServices(id);
			await retrieveWifiList(id);
		} catch (error) {
			console.error('Failed after connecting to scanner:', id, error);
			// Handle post-connection error
		} finally {
			dispatch(setConnecting(false));
		}
	};

	const disconnectFromScanner = async (id: string) => {
		try {
			dispatch(setConnecting(true));
			await BleManager.disconnect(id, true);
			console.log('Disconnected from scanner:', id);

			dispatch(setConnecting(false));
			dispatch(resetConnectedScanner());
		} catch (error) {
			dispatch(setConnecting(false));
			dispatch(resetConnectedScanner());
			console.error('Failed to disconnect from scanner:', id, error);
		}
	};

	return { connectToScanner, disconnectFromScanner, retrieveWifiList };
};

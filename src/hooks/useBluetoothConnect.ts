import {
	resetConnectedScanner,
	setConnectedDeviceId,
	setConnecting,
	setConnectedDeviceWifiList,
} from '@/providers/redux/slices';
import BleManager from 'react-native-ble-manager';
import { useDispatch } from 'react-redux';
import settings from '@/globalConstants';
import { Wifi } from '@/types/scannerData';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();

	const retrieveWifiList = async (id: string) => {
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
		try {
			dispatch(setConnecting(true));
			await BleManager.connect(id);
			console.log('Connected to scanner:', id);
			dispatch(setConnectedDeviceId(id));

			await retreiveServices(id);
			await retrieveWifiList(id);

			dispatch(setConnecting(false));
		} catch (error) {
			dispatch(setConnecting(false));
			dispatch(resetConnectedScanner());
			console.error('Failed to connect to scanner:', id, error);
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

	return { connectToScanner, disconnectFromScanner };
};

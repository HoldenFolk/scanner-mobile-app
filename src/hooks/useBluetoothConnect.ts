import {
	resetConnectedScanner,
	setConnectedDeviceId,
	setConnecting,
	setConnectedDeviceWifiList,
	setLoadingWifiList,
	setConnected,
	setConnectedDevicePlugState,
	setConnectedDeviceMacAddress,
	setConnectedDeviceWifiPSWD,
	setConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import BleManager from 'react-native-ble-manager';
import { useDispatch } from 'react-redux';
import settings from '@/globalConstants';
import { PlugState, Wifi } from '@/types/scannerData';
import { readCharacteristic, retreiveServices } from '@/utils/bleManager';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();
	// Max attempts at connecting to the scanner before throwing an error
	const MAX_ATTEMPTS = 5;

	const attemptConnection = async (id: string) => {
		for (let attempts = 1; attempts <= MAX_ATTEMPTS; attempts++) {
			try {
				await BleManager.connect(id);
				console.log(`Connected to scanner: ${id} on attempt ${attempts}`);
				return;
			} catch (error) {
				console.log(
					`Failed to connect to scanner (attempt ${attempts}):`,
					id,
					error,
				);
				if (attempts < MAX_ATTEMPTS) {
					await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
				} else {
					throw new Error('Failed to connect to scanner');
				}
			}
		}
	};

	const retreiveCurrentWifiConfig = async (id: string) => {
		const ssidCode = await readCharacteristic(
			id,
			settings.serviceID,
			settings.characteristicIDSSID,
		);
		const passwordCode = await readCharacteristic(
			id,
			settings.serviceID,
			settings.characteristicIDPassword,
		);

		return { ssidCode, passwordCode };
	};

	const retrieveWifiList = async (id: string) => {
		dispatch(setLoadingWifiList(true));
		const wifiList: Wifi[] = [];

		let isUniqueSSID = true;
		do {
			const data = await readCharacteristic(
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
	};

	const connectToScanner = async (
		id: string,
		macAddress: string,
		plugState: PlugState,
	) => {
		dispatch(setConnecting(true));

		try {
			await attemptConnection(id);

			// Set the connected device state
			dispatch(setConnectedDeviceId(id));
			dispatch(setConnectedDeviceMacAddress(macAddress));
			dispatch(setConnectedDevicePlugState(plugState));
			dispatch(setConnected(true));

			// Retrieve services and wifi list
			await retreiveServices(id);
			await retrieveWifiList(id);

			// Retrieve current wifi config from device characteristics
			const { ssidCode, passwordCode } = await retreiveCurrentWifiConfig(id);
			const ssid = ssidCode
				? String.fromCharCode.apply(null, ssidCode)
				: undefined;
			const password = passwordCode
				? String.fromCharCode.apply(null, passwordCode)
				: undefined;

			// Check if ssid or password contains null characters and trim them
			// eslint-disable-next-line no-control-regex
			const nullPattern = /^[\u0000]+$/;
			const processedSsid = ssid ? ssid.replace(nullPattern, '') : ssid;
			const processedPassword = password
				? password.replace(nullPattern, '')
				: password;

			console.log('Current wifi config:', processedSsid, processedPassword);

			// Set the global connected device wifi config
			dispatch(setConnectedDeviceWifiSSID(processedSsid));
			dispatch(setConnectedDeviceWifiPSWD(processedPassword));

			return true;
		} catch (error) {
			console.error('Error during connection process:', error);
			dispatch(resetConnectedScanner());
			return false;
		} finally {
			dispatch(setConnecting(false));
		}
	};

	const disconnectFromScanner = async (id: string) => {
		try {
			dispatch(setConnecting(true));
			await BleManager.disconnect(id);
			console.log('Disconnected from scanner:', id);

			dispatch(setConnected(false));
			dispatch(resetConnectedScanner());
			return true;
		} catch (error) {
			dispatch(resetConnectedScanner());
			console.error('Failed to disconnect from scanner:', id, error);
			return false;
		} finally {
			dispatch(setConnecting(false));
		}
	};

	// Check if the scanner is connected
	const isScannerConnected = async (id: string) => {
		try {
			const isConnected = await BleManager.isPeripheralConnected(id);
			return isConnected;
		} catch (error) {
			console.error('Failed to check if scanner is connected:', error);
		}
	};

	return {
		connectToScanner,
		disconnectFromScanner,
		retrieveWifiList,
		isScannerConnected,
	};
};

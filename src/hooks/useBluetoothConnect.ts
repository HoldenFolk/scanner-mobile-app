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
import { Alert } from 'react-native';

export const useBluetoothConnect = () => {
	const dispatch = useDispatch();

	const MAX_ATTEMPTS = 5; // Maximum connection attempts
	const TIMEOUT = 20000; // 20 seconds before timeout

	const showAlert = (message: string) => {
		Alert.alert('Connection Error.', message, [{ text: 'OK' }]);
	};

	const createTimeoutPromise = (timeoutController: {
		isTimeout: boolean;
	}): { promise: Promise<void>; timeoutHandle: NodeJS.Timeout | undefined } => {
		let timeoutHandle: NodeJS.Timeout | undefined;
		const promise = new Promise<void>((_, reject) => {
			timeoutHandle = setTimeout(() => {
				timeoutController.isTimeout = true;
				showAlert(
					'You have lost connection to the scanner during the configuration process. Make sure you are in range of the scanner.\n\nIf the problem persists, unplug the scanner and try again.',
				);
				reject(
					new Error(
						'Connection attempt timed out. Failed to connect to scanner',
					),
				);
			}, TIMEOUT);
		});
		return { promise, timeoutHandle };
	};

	const connectWithRetries = async (
		id: string,
		timeoutController: { isTimeout: boolean },
	): Promise<void> => {
		for (let attempts = 1; attempts <= MAX_ATTEMPTS; attempts++) {
			if (timeoutController.isTimeout) {
				throw new Error('Connection process aborted due to timeout');
			}
			try {
				await BleManager.connect(id);
				return; // Connection successful
			} catch (error) {
				if (timeoutController.isTimeout) {
					throw new Error('Connection process aborted due to timeout');
				}
				console.warn(
					`Failed to connect to scanner. Attempt ${attempts}/${MAX_ATTEMPTS}`,
				);
				if (attempts < MAX_ATTEMPTS) {
					await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
				} else {
					showAlert(
						'You have lost connection to the scanner during the configuration process. Make sure you are in range of the scanner.\n\nIf the problem persists, unplug the scanner and try again.',
					);
					throw new Error('Failed to connect to scanner');
				}
			}
		}
	};

	const attemptConnection = async (id: string): Promise<void> => {
		const timeoutController = { isTimeout: false };
		const { promise: timeoutPromise, timeoutHandle } =
			createTimeoutPromise(timeoutController);

		try {
			await Promise.race([
				connectWithRetries(id, timeoutController),
				timeoutPromise,
			]);
			console.log('Connected to scanner:', id);
			// Clear the timeout if connection is successful
			clearTimeout(timeoutHandle);
		} catch (error) {
			console.error('Error during connection process:', error);
			throw error;
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

			// Convert the ssid and password from byte array to string
			const ssid = ssidCode
				? String.fromCharCode.apply(null, ssidCode)
				: undefined;
			const password = passwordCode
				? String.fromCharCode.apply(null, passwordCode)
				: undefined;

			// Check if ssid or password contains null characters and trim them
			// eslint-disable-next-line no-control-regex
			const nullPattern = /\u0000/g;
			const processedSsid = ssid ? ssid.replace(nullPattern, '') : ssid;
			const processedPassword = password
				? password.replace(nullPattern, '')
				: password;

			const wifiConfig = {
				ssid: processedSsid,
				password: processedPassword,
			};

			console.log(JSON.stringify(wifiConfig, null, 2));

			// Set the global connected device wifi config
			dispatch(setConnectedDeviceWifiSSID(processedSsid));
			dispatch(setConnectedDeviceWifiPSWD(processedPassword));

			return true;
		} catch (error) {
			console.error('Error during connection process:', error);
			BleManager.disconnect(id);
			dispatch(setConnecting(false));
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

import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import settings from '@/globalConstants';
import { useSelector } from 'react-redux';
import {
	getConnectedDeviceGeolocation,
	getConnectedDeviceWifiPSWD,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import { updateScannerConfig } from '@/api/apiConfig';

export const useScannerConfigure = () => {
	const wifiSSID = useSelector(getConnectedDeviceWifiSSID);
	const wifiPassword = useSelector(getConnectedDeviceWifiPSWD);
	const geolocation = useSelector(getConnectedDeviceGeolocation);

	const writeCharacteristic = async (
		deviceId: string,
		serviceUUID: string,
		characteristicUUID: string,
		data?: string,
	) => {
		try {
			if (!data) throw new Error('Data is empty when configuring device wifi');
			const buffer = Buffer.from(data, 'utf-8');
			const dataArray = Array.from(buffer);
			await BleManager.write(
				deviceId,
				serviceUUID,
				characteristicUUID,
				dataArray,
			);
		} catch (error) {
			console.error(error as Error);
		} finally {
			// do nothing
		}
	};

	const configureDeviceWifi = async (deviceId: string) => {
		try {
			await writeCharacteristic(
				deviceId,
				settings.serviceID,
				settings.characteristicIDWriteSSID,
				wifiSSID,
			);
			await writeCharacteristic(
				deviceId,
				settings.serviceID,
				settings.characteristicIDWritePassword,
				wifiPassword,
			);
			console.log('WIFI Configuration sucess!');
		} catch (error) {
			console.error(error as Error);
		}
	};
	// TODO: Add name configuration
	const configureDeviceGeolocation = async (deviceId: string) => {
		try {
			if (!geolocation)
				throw new Error('Geolocation is empty when configuring device wifi');
			if (!wifiSSID)
				throw new Error('Wifi SSID is empty when configuring device wifi');
			if (!wifiPassword)
				throw new Error('Wifi Password is empty when configuring device wifi');
			const response = await updateScannerConfig(
				deviceId,
				wifiSSID,
				wifiPassword,
				'KaiduScanner',
				geolocation,
			);
			console.log('Geolocation Configuration response!', response);
		} catch (error) {
			console.error(error as Error);
		}
	};
	return { configureDeviceWifi, configureDeviceGeolocation };
};

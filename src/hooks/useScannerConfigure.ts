import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import settings from '@/globalConstants';
import { useSelector } from 'react-redux';
import {
	getConnectedDeviceWifiPSWD,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';

export const useScannerConfigure = () => {
	const wifiSSID = useSelector(getConnectedDeviceWifiSSID);
	const wifiPassword = useSelector(getConnectedDeviceWifiPSWD);

	const writeCharacteristic = async (
		deviceId: string,
		serviceUUID: string,
		characteristicUUID: string,
		data?: string,
	) => {
		try {
			console.log('Writing to characteristic: ', data);
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
		console.log('Configuration sucess!');
	};

	return { configureDeviceWifi };
};

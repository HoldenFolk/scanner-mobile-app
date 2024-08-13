import settings from '@/globalConstants';
import { useSelector } from 'react-redux';
import {
	getConnectedDeviceGeolocation,
	getConnectedDeviceName,
	getConnectedDeviceWifiPSWD,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import { updateScannerConfig } from '@/api/apiConfig';
import { writeCharacteristic } from '@/utils/bleManager';

export const useScannerConfigure = () => {
	const wifiSSID = useSelector(getConnectedDeviceWifiSSID);
	const wifiPassword = useSelector(getConnectedDeviceWifiPSWD);
	const geolocation = useSelector(getConnectedDeviceGeolocation);
	const name = useSelector(getConnectedDeviceName);

	const configureDeviceWifi = async (deviceId: string) => {
		try {
			console.log('Configuring device wifi...');
			console.log('SSID:', wifiSSID);
			await writeCharacteristic(
				deviceId,
				settings.serviceID,
				settings.characteristicIDSSID,
				wifiSSID,
			);
			await writeCharacteristic(
				deviceId,
				settings.serviceID,
				settings.characteristicIDPassword,
				wifiPassword,
			);
			console.log('WIFI Configuration sucess!');
		} catch (error) {
			console.error(error as Error);
		}
	};
	// TODO: Add name configuration
	const configureDeviceGeolocation = async (macAddress: string) => {
		if (!wifiSSID)
			throw new Error('Wifi SSID is empty when configuring device wifi');
		const response = await updateScannerConfig(
			macAddress,
			wifiSSID,
			wifiPassword || '',
			name,
			geolocation,
		);
		console.log('Geolocation Configuration sucess!');
		return response;
	};
	return { configureDeviceWifi, configureDeviceGeolocation };
};

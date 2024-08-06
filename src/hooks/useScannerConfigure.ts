import settings from '@/globalConstants';
import { useSelector } from 'react-redux';
import {
	getConnectedDeviceGeolocation,
	getConnectedDeviceWifiPSWD,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import { updateScannerConfig } from '@/api/apiConfig';
import { writeCharacteristic } from '@/utils/bleManager';

export const useScannerConfigure = () => {
	const wifiSSID = useSelector(getConnectedDeviceWifiSSID);
	const wifiPassword = useSelector(getConnectedDeviceWifiPSWD);
	const geolocation = useSelector(getConnectedDeviceGeolocation);

	const configureDeviceWifi = async (deviceId: string) => {
		try {
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
		if (!geolocation)
			throw new Error('Geolocation is empty when configuring device wifi');
		if (!wifiSSID)
			throw new Error('Wifi SSID is empty when configuring device wifi');
		const response = await updateScannerConfig(
			macAddress,
			wifiSSID,
			wifiPassword || '',
			'KaiduScanner',
			geolocation,
		);
		console.log('Geolocation Configuration sucess!');
		return response;
	};
	return { configureDeviceWifi, configureDeviceGeolocation };
};

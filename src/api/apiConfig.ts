import { Geolocation } from '@/types/api';
import apiClient from './apiClient';

export const updateScannerConfig = async (
	macAddress: string,
	wifiSSID: string,
	wifiPassword: string,
	scannerName: string,
	geolocation: Geolocation | undefined,
): Promise<string> => {
	const params = new URLSearchParams({
		wifi_ssid: wifiSSID,
		wifi_password: wifiPassword,
		scanner_name: scannerName,
		geo: JSON.stringify(geolocation),
	}).toString();
	const response = await apiClient.get(
		`kaidu_device_configuration/configstring/${macAddress}?${params}`,
	);
	return response.data;
};

export const getScannerConfig = async (macAddress: string): Promise<string> => {
	const response = await apiClient.get(
		`kaidu_device_configuration/configstring/${macAddress}`,
	);
	return response.data;
};

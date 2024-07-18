import apiClient from './apiClient';

// v2 API that gets a list of scanners from the customer ID
export const getScannerConfig = async (
	macAddress: string,
	wifiSSID: string,
	wifiPassword: string,
	scannerName: string,
): Promise<any> => {
	const response = await apiClient.get(
		`kaidu_device_configuration/configstring/${macAddress}/${wifiSSID}/${wifiPassword}/${scannerName}`,
	);
	return response.data;
};

export const updateScannerConfig = async (macAddress: string): Promise<any> => {
	const response = await apiClient.put(
		`v1/kaidu_device_configuration/${macAddress}`,
	);
	return response.data;
};

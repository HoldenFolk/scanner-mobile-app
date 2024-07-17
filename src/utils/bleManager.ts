import BleManager from 'react-native-ble-manager';
import Snackbar from 'react-native-snackbar';
import { DefaultTheme } from 'styled-components/native';

export const retreiveServices = async (id: string) => {
	try {
		const services = await BleManager.retrieveServices(id);
		console.log('Retrieved services:');
		return services;
	} catch (error) {
		console.error('Failed to retrieve services:', error);
	}
};

export const readCharacteristic = async (
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

export const handleBleConnectEvent = (theme: DefaultTheme) => {
	Snackbar.show({
		text: `BLE connected`,
		textColor: theme.colors.success,
		duration: Snackbar.LENGTH_LONG,
		backgroundColor: theme.colors.grayscale[2],
	});
};

export const handleBleDisconnectEvent = (theme: DefaultTheme) => {
	Snackbar.show({
		text: `BLE Disconnected`,
		textColor: theme.colors.success,
		duration: Snackbar.LENGTH_LONG,
		backgroundColor: theme.colors.grayscale[2],
	});
};

import { Alert } from 'react-native';
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
// TODO: fix this
export const handleBleDisconnectEvent = (
	theme: DefaultTheme,
	isConnecting: boolean,
) => {
	Snackbar.show({
		text: `BLE Disconnected`,
		textColor: theme.colors.success,
		duration: Snackbar.LENGTH_LONG,
		backgroundColor: theme.colors.grayscale[2],
	});
	if (!isConnecting) {
		Alert.alert(
			'Connection Error.',
			'You have lost connection to the scanner during the configuration process. Make sure you are in range of the scanner and try again.',
			[{ text: 'OK' }],
		);
	}
};

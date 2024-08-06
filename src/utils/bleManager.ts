import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';

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

export const writeCharacteristic = async (
	deviceId: string,
	serviceUUID: string,
	characteristicUUID: string,
	data?: string,
) => {
	try {
		if (!data) data = '';
		const buffer = Buffer.from(data, 'utf-8');
		const dataArray = Array.from(buffer);
		await BleManager.write(
			deviceId,
			serviceUUID,
			characteristicUUID,
			dataArray,
		);
	} catch (error) {
		console.error('Failed to write characteristic', error);
	}
};

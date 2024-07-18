import BleManager from 'react-native-ble-manager';

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

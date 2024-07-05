import {
	requestBluetoothPermission,
	requestPreciseLocationPermission,
	checkBluetoothPermission,
	checkPreciseLocationPermission,
} from '@/utils/permissions';

export const usePermissions = async () => {
	const bluetoothPermission = await checkBluetoothPermission();
	const preciseLocationPermission = await checkPreciseLocationPermission();

	if (bluetoothPermission !== 'granted') {
		await requestBluetoothPermission();
	}

	if (preciseLocationPermission !== 'granted') {
		await requestPreciseLocationPermission();
	}
};

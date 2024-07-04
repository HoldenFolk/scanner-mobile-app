import {
	requestBluetoothPermission,
	requestPreciseLocationPermission,
	checkBluetoothPermission,
	checkPreciseLocationPermission,
} from '@/utils';

export const usePermissions = async () => {
	const bluetoothPermission = await checkBluetoothPermission();
	const preciseLocationPermission = await checkPreciseLocationPermission();

	if (!bluetoothPermission) {
		await requestBluetoothPermission();
	}

	if (!preciseLocationPermission) {
		await requestPreciseLocationPermission();
	}
};

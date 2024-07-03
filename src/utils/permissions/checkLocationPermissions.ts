import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

/**
 * Function to check precise location permission on iOS
 */
export async function checkIOSPreciseLocationPermission(): Promise<string> {
	const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
	return result;
}

/**
 * Function to check precise location permission on Android
 */
export async function checkAndroidPreciseLocationPermission(): Promise<string> {
	const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
	return result;
}

/**
 * Function to check location permission on both Android and iOS
 */
export async function checkPreciseLocationPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await checkIOSPreciseLocationPermission();
	} else {
		result = await checkAndroidPreciseLocationPermission();
	}

	return result;
}

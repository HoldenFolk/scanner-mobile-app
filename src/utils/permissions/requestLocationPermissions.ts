import { request, PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

/**
 * Function to request precise location permission on iOS
 */
export async function requestIOSPreciseLocationPermission(): Promise<string> {
	return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
}

/**
 * Function to request precise location permission on Android
 */
export async function requestAndroidPreciseLocationPermission(): Promise<string> {
	return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
}

/**
 * Function to request location permission on both Android and iOS
 */
export async function requestPreciseLocationPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await requestIOSPreciseLocationPermission();
	} else {
		result = await requestAndroidPreciseLocationPermission();
	}
	// Create alert pop up if permission is denied
	if (result !== 'granted') {
		Alert.alert(
			'Permission Denied',
			'Location permission is required to use feature.',
		);
	}

	return result;
}

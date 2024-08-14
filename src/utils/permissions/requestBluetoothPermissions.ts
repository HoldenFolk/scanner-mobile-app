import { request, PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform } from 'react-native';
import { isAndroid12AndAbove } from '../checkAndroidVersion';
import { requestPreciseLocationPermission } from './requestLocationPermissions';

export async function requestIOSBluetoothPermission(): Promise<string> {
	return request(PERMISSIONS.IOS.BLUETOOTH);
}

/**
 * Request Bluetooth connect permission on Android
 */
export async function requestAndroidBasicBluetooth(): Promise<string> {
	return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
}

/**
 * Request BLUETOOTH_SCAN permission on Android, required for Android 12 and above
 */
export async function requestBluetoothScan(): Promise<string> {
	return request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
}

/**
 * Request Bluetooth permission on both Android and iOS
 */
export async function requestBluetoothPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await requestIOSBluetoothPermission();
	} else if (isAndroid12AndAbove()) {
		// Request both BLUETOOTH_SCAN and BLUETOOTH_CONNECT for Android 12 and above
		const scanResult = await requestBluetoothScan();
		const connectResult = await requestAndroidBasicBluetooth();
		result =
			scanResult === 'granted' && connectResult === 'granted'
				? 'granted'
				: 'denied';
	} else {
		const locationResult = await requestPreciseLocationPermission();
		result = locationResult === 'granted' ? 'granted' : 'denied';
	}

	// Create alert pop up if permission is denied
	if (result !== 'granted') {
		Alert.alert(
			'Permission Denied',
			'Bluetooth permission is required to use feature.',
		);
	}

	return result;
}

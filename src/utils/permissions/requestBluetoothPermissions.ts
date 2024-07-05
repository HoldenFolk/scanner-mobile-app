import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { isAndroid12AndAbove } from '../checkAndroidVersion';

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
 * Request ACCESS_FINE_LOCATION permission on Android, required for Bluetooth scanning on Android 11 and below
 */
export async function requestLocationPermission(): Promise<string> {
	return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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
		if (scanResult === 'granted' && connectResult === 'granted') {
			result = 'granted';
		} else {
			result = 'denied';
		}
	} else {
		result = await requestLocationPermission();
	}

	return result;
}

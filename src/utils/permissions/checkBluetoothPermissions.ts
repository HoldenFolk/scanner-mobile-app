import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { isAndroid12AndAbove } from '../checkAndroidVersion';

/**
 * Function to check Bluetooth permission on iOS
 */
export async function checkIOSBluetoothPermission(): Promise<string> {
	return check(PERMISSIONS.IOS.BLUETOOTH);
}

/**
 * Function to check Bluetooth connect permission on Android
 */
export async function checkAndroidBasicBluetoothPermission(): Promise<string> {
	return check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
}

/**
 * Function to check BLUETOOTH_SCAN permission on Android, required for Android 12 and above
 */
export async function checkBluetoothScanPermission(): Promise<string> {
	return check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
}

/**
 * Function to check ACCESS_FINE_LOCATION permission on Android, required for Bluetooth scanning on Android 11 and below
 */
export async function checkLocationPermission(): Promise<string> {
	return check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
}

/**
 * Function to check Bluetooth permission on both Android and iOS
 */
export async function checkBluetoothPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await checkIOSBluetoothPermission();
	} else if (isAndroid12AndAbove()) {
		// Check both BLUETOOTH_SCAN and BLUETOOTH_CONNECT for Android 12 and above
		const scanResult = await checkBluetoothScanPermission();
		const connectResult = await checkAndroidBasicBluetoothPermission();
		if (scanResult === 'granted' && connectResult === 'granted') {
			result = 'granted';
		} else {
			result = 'denied';
		}
	} else {
		result = await checkLocationPermission();
	}

	return result;
}

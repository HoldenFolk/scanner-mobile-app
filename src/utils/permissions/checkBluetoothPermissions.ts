import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { isAndroid12AndAbove } from '../checkAndroidVersion';

/**
 * Function to check Bluetooth permission on iOS
 */
export async function checkIOSBluetoothPermission(): Promise<string> {
	const result = await check(PERMISSIONS.IOS.BLUETOOTH);
	return result;
}

/**
 * Function to check Bluetooth connect permission on Android
 */
export async function checkAndroidBasicBluetoothPermission(): Promise<string> {
	const result = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
	return result;
}

/**
 * Function to check BLUETOOTH_SCAN permission on Android, required for Android 12 and above
 */
export async function checkBluetoothScanPermission(): Promise<string> {
	const result = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
	return result;
}

/**
 * Function to check Bluetooth permission on both Android and iOS
 */
export async function checkBluetoothPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await checkIOSBluetoothPermission();
	} else {
		result = await checkAndroidBasicBluetoothPermission();

		if (isAndroid12AndAbove()) {
			result = await checkBluetoothScanPermission();
		}
	}

	return result;
}

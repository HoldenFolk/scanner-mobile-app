import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

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
	console.log('requestBluetoothScan');
	return request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
}

/**
 * Request Bluetooth permission on both Android and iOS
 */
export async function requestBluetoothPermission(): Promise<string> {
	let result: string;

	if (Platform.OS === 'ios') {
		result = await requestIOSBluetoothPermission();
	} else {
		result = await requestAndroidBasicBluetooth();

		if (isAndroid12AndAbove()) {
			result = await requestBluetoothScan();
		}
	}

	return result;
}

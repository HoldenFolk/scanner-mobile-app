import { useEffect, useState } from 'react';
import BleManager from 'react-native-ble-manager';
import {
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid,
} from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface Device {
	id: string;
	name: string;
}

const requestPermissions = async () => {
	if (Platform.OS === 'android') {
		if (Platform.Version >= 31) {
			const permissions = [
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			];
			const granted = await PermissionsAndroid.requestMultiple(permissions);
			console.log('Permissions granted:', granted);
			return (
				granted['android.permission.BLUETOOTH_SCAN'] ===
					PermissionsAndroid.RESULTS.GRANTED &&
				granted['android.permission.BLUETOOTH_CONNECT'] ===
					PermissionsAndroid.RESULTS.GRANTED &&
				granted['android.permission.ACCESS_FINE_LOCATION'] ===
					PermissionsAndroid.RESULTS.GRANTED
			);
		} else if (Platform.Version >= 23) {
			const permission = await PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
			console.log('Location permission checked:', permission);
			if (!permission) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				);
				console.log('Location permission granted:', granted);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			}
			return true;
		}
	}
	return true;
};

export const useBluetoothScan = () => {
	const [devices, setDevices] = useState<Device[]>([]);
	const [scanning, setScanning] = useState(false);

	useEffect(() => {
		const initializeBleManager = async () => {
			try {
				console.log('Starting BleManager');
				await BleManager.start({ showAlert: false });
				console.log('BleManager started');

				const handleDiscoverPeripheral = (peripheral: any) => {
					console.log('Discovered peripheral:', peripheral);
					const { id, name } = peripheral;
					setDevices(prevDevices => {
						const deviceExists = prevDevices.some(device => device.id === id);
						if (!deviceExists) {
							return [...prevDevices, { id, name: name || 'Unnamed device' }];
						}
						return prevDevices;
					});
				};

				bleManagerEmitter.addListener(
					'BleManagerDiscoverPeripheral',
					handleDiscoverPeripheral,
				);

				const startScan = async () => {
					const permissionGranted = await requestPermissions();
					if (!permissionGranted) {
						console.warn('Bluetooth permission not granted');
						return;
					}

					setScanning(true);
					console.log('Starting scan');
					await BleManager.scan([], 10, true);
					console.log('Scanning started');
				};

				startScan();

				return () => {
					console.log('Removing listeners');
					bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
				};
			} catch (error) {
				console.error('Failed to initialize BleManager:', error);
			}
		};

		initializeBleManager();
	}, []);

	return { devices, scanning };
};

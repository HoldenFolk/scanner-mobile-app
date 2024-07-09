import { useEffect, useCallback } from 'react';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { requestBluetoothPermission } from '@/utils/permissions';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsScanning,
	setScanning,
	addDevice,
	clearDevices,
} from '@/providers/redux/slices';
import { PlugState } from '@/types/scannerData';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// TODO: Change the mac address to be obtained from the manufaturer data
// TODO: Make the scanners remove when lost connection
export const useBluetoothScan = () => {
	const isScanning = useSelector(getIsScanning);
	const dispatch = useDispatch();

	// Handle discovered peripherals and update the device list
	const handleDiscoverPeripheral = useCallback(
		(peripheral: any) => {
			const { id, name, advertising, rssi } = peripheral;
			if (name === 'KaiduScanner') {
				console.log('Discovered KaiduScanner:', name);
				// TODO: Add functionality to allow LTE Scanners to be added
				// TODO: Add functionality to get the plugstate of the scanners
				dispatch(
					addDevice({
						id,
						name,
						advertising,
						rssi,
						plugState: PlugState.UNCONFIGURED,
						kaiduDeviceType: 'wifi',
					}),
				);
			}
		},
		[dispatch],
	);

	// Initialize BleManager and add event listeners
	const initializeBleManager = useCallback(async () => {
		try {
			await BleManager.start({ showAlert: false });
			console.log('BleManager started');
			bleManagerEmitter.addListener(
				'BleManagerDiscoverPeripheral',
				handleDiscoverPeripheral,
			);
		} catch (error) {
			console.error('Failed to initialize BleManager:', error);
		}
	}, [handleDiscoverPeripheral]);

	// Initialize BleManager on mount and clean up on unmount
	useEffect(() => {
		initializeBleManager();
		return () => {
			console.log('Removing listeners');
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [initializeBleManager]);

	// Start or stop scanning based on the global isScanning state
	useEffect(() => {
		// Start the scanning process
		const startScan = async () => {
			const permissionGranted = await requestBluetoothPermission();
			if (!permissionGranted) {
				console.warn('Bluetooth permission not granted');
				dispatch(setScanning(false));
				return;
			}
			console.log('Starting scan');
			await BleManager.scan([], 60, true);
			console.log('Scanning started');
		};

		// Stop the scanning process manually
		const stopScan = () => {
			BleManager.stopScan();
			dispatch(setScanning(false));
			dispatch(clearDevices());
			console.log('Scanning manually stopped');
		};

		if (isScanning) {
			startScan();
		} else {
			stopScan();
		}
	}, [dispatch, isScanning]);

	return {};
};

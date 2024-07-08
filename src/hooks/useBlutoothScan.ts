import { useEffect, useRef, useCallback } from 'react';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { requestBluetoothPermission } from '@/utils/permissions';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsScanning,
	setScanning,
	addDevice,
	removeDevice,
	getDevices,
} from '@/providers/redux/slices';
import { PlugState } from '@/types/scannerData';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const useBluetoothScan = () => {
	const isScanning = useSelector(getIsScanning);
	const allDevices = useSelector(getDevices);
	const dispatch = useDispatch();
	const devicesInCurrentScan = useRef(new Set<string>());

	// TODO: Change the MAC address to be obtained from the manufaturer data
	// TODO: Add BleManagerUpdateState event to handle Bluetooth state changes
	// TODO: Add update functionaly to update and remove devices from the list on change
	const handleDiscoverPeripheral = useCallback(
		(peripheral: any) => {
			const { id, name, advertising, rssi } = peripheral;
			if (name === 'KaiduScanner') {
				console.log('Discovered KaiduScanner:', name);
				devicesInCurrentScan.current.add(id);
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

	const cleanUpDevices = useCallback(() => {
		const currentDevices = Array.from(devicesInCurrentScan.current);
		allDevices.forEach(device => {
			if (!currentDevices.includes(device.id)) {
				dispatch(removeDevice(device.id));
			}
		});
	}, [allDevices, dispatch]);

	const startScan = useCallback(async () => {
		const permissionGranted = await requestBluetoothPermission();
		if (!permissionGranted) {
			console.warn('Bluetooth permission not granted');
			dispatch(setScanning(false));
			return;
		}

		devicesInCurrentScan.current.clear();
		console.log('Starting scan');
		await BleManager.scan([], 60, true);
		console.log('Scanning started');
	}, [dispatch]);

	const stopScan = useCallback(() => {
		BleManager.stopScan();
		cleanUpDevices();
		dispatch(setScanning(false));
		console.log('Scanning manually stopped');
	}, [cleanUpDevices, dispatch]);

	// Initialize BleManager and add event listener
	useEffect(() => {
		initializeBleManager();
		return () => {
			console.log('Removing listeners');
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [initializeBleManager]);

	// Start or stop scanning based on the global state
	useEffect(() => {
		if (isScanning) {
			startScan();
		} else {
			stopScan();
		}
	}, [isScanning, startScan, stopScan]);

	return { scanning: isScanning };
};

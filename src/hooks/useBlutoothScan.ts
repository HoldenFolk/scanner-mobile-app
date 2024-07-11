import { useEffect } from 'react';
import BleManager from 'react-native-ble-manager';
import { requestBluetoothPermission } from '@/utils/permissions';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsScanning,
	setScanning,
	clearDevices,
} from '@/providers/redux/slices';

// TODO: Change the mac address to be obtained from the manufaturer data
// TODO: Make the scanners remove when lost connection
export const useBluetoothScan = () => {
	const isScanning = useSelector(getIsScanning);
	const dispatch = useDispatch();

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

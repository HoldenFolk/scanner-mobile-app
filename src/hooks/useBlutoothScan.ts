import { useEffect } from 'react';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { requestBluetoothPermission } from '@/utils/permissions';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsScanning,
	setScanning,
	addDevice,
} from '@/providers/redux/slices';
import { PlugState } from '@/types/scannerData';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// TODO: Add functionality to monitor and remove bluetooth scanner if lost connection
export const useBluetoothScan = () => {
	const isScanning = useSelector(getIsScanning);
	const dispatch = useDispatch();

	// This effect will initialize the BleManager and add a listener for discovered peripherals on mount
	useEffect(() => {
		const initializeBleManager = async () => {
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
		};

		// TODO: Change the MAC address to be obtained from the manufacturer data
		const handleDiscoverPeripheral = (peripheral: any) => {
			const { id, name, advertising, rssi } = peripheral;
			if (name === 'KaiduScanner') {
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
		};

		initializeBleManager();

		return () => {
			console.log('Removing listeners');
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [dispatch]);

	// This effect will start or stop scanning based on the global isScanning state
	useEffect(() => {
		const startScan = async () => {
			const permissionGranted = await requestBluetoothPermission();
			if (!permissionGranted) {
				console.warn('Bluetooth permission not granted');
				dispatch(setScanning(false));
				return;
			}

			console.log('Starting scan');
			await BleManager.scan([], 10, true);
			console.log('Scanning started');

			setTimeout(() => {
				BleManager.stopScan();
				console.log('Scanning stopped after timeout');
				dispatch(setScanning(false));
			}, 10000); // stop scanning after 10 seconds
		};

		if (isScanning) {
			startScan();
		} else {
			BleManager.stopScan();
			console.log('Scanning manually stopped');
		}
	}, [isScanning, dispatch]);

	return { scanning: isScanning };
};

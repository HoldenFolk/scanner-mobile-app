import { addDevice } from '@/providers/redux/slices';
import { PlugState } from '@/types/scannerData';
import { useCallback, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const useBluetoothManager = () => {
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
};

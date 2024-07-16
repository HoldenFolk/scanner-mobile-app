import { addDevice } from '@/providers/redux/slices';
import { PlugState } from '@/types/scannerData';
import { useCallback, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
import BleManager from 'react-native-ble-manager';
import { ManufacturerDataRaw } from '@/types/bleManagerTypes';
import { decodeManufacturerData } from '@/utils/manufacturerData';
import { getValidPlugState } from '@/utils/plugState';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const useBluetoothManager = () => {
	const dispatch = useDispatch();

	// Handle discovered peripherals and update the device list
	// TODO: Add data validation to ensure all propper data is contained within the peripheral
	const handleDiscoverPeripheral = useCallback(
		(peripheral: any) => {
			const { name, advertising, rssi } = peripheral;
			if (name === 'KaiduScanner') {
				console.log('Discovered KaiduScanner:', name);

				const manufacturerRawData: ManufacturerDataRaw =
					advertising?.manufacturerData || {};

				const manufacturerData = decodeManufacturerData(
					manufacturerRawData.ffff.bytes,
				);
				console.log('Manufacturer data:', manufacturerData);

				const plugState = getValidPlugState(manufacturerData?.plugState);
				const id = manufacturerData?.macAddress;
				dispatch(
					addDevice({
						id,
						name,
						advertising,
						rssi,
						plugState: plugState,
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

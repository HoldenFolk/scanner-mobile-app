import { addDevice } from '@/providers/redux/slices';
import { useCallback, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { decodeManufacturerData } from '@/utils/manufacturerData';
import { getValidPlugState } from '@/utils/plugState';
import {
	BLE_CONNECT_EVENT,
	BLE_DISCONNECT_EVENT,
	SCANNED_DEVICE_EVENT,
} from '@/utils/bleConstants';
import { useTheme } from 'styled-components/native';
import {
	handleBleConnectEvent,
	handleBleDisconnectEvent,
} from '@/utils/bleManager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const useBluetoothManager = () => {
	const dispatch = useDispatch();
	const theme = useTheme();

	// Handle discovered peripherals and update the device list
	// TODO: Add data validation to ensure all propper data is contained within the peripheral
	const handleDiscoverPeripheral = useCallback(
		(peripheral: Peripheral) => {
			const { name, advertising, rssi } = peripheral;
			if (name === 'KaiduScanner') {
				console.log('Discovered KaiduScanner:', name);

				const manufacturerRawData =
					advertising.manufacturerData?.ffff?.bytes || [];

				const manufacturerData = decodeManufacturerData(manufacturerRawData);
				console.log('Manufacturer data:', manufacturerData);

				const plugState = getValidPlugState(manufacturerData?.plugState);
				const id = manufacturerData.macAddress;
				const wifiRssi = manufacturerData.rssi;
				dispatch(
					addDevice({
						id,
						name,
						rssi,
						wifiRssi,
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
				SCANNED_DEVICE_EVENT,
				handleDiscoverPeripheral,
			);
			bleManagerEmitter.addListener(BLE_CONNECT_EVENT, _event =>
				handleBleConnectEvent(theme),
			);
			bleManagerEmitter.addListener(BLE_DISCONNECT_EVENT, _event =>
				handleBleDisconnectEvent(theme),
			);
		} catch (error) {
			console.error('Failed to initialize BleManager:', error);
		}
	}, [handleDiscoverPeripheral, theme]);

	// Initialize BleManager on mount and clean up on unmount
	useEffect(() => {
		initializeBleManager();
		return () => {
			console.log('Removing listeners');
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [initializeBleManager]);
};

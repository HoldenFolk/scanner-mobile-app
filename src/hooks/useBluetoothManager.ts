import {
	addDevice,
	getIsConnecting,
	resetConnectedScanner,
	setConnected,
} from '@/providers/redux/slices';
import { useCallback, useEffect, useRef } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { decodeManufacturerData } from '@/utils/manufacturerData';
import { getValidPlugState } from '@/utils/plugState';
import {
	BLE_CONNECT_EVENT,
	BLE_DISCONNECT_EVENT,
	SCANNED_DEVICE_EVENT,
} from '@/utils/bleConstants';
import { useTheme } from 'styled-components/native';
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const useBluetoothManager = () => {
	const dispatch = useDispatch();
	const theme = useTheme();

	const isConnecting = useSelector(getIsConnecting);
	const isConnectingRef = useRef(isConnecting);

	// Update the ref whenever isConnecting changes
	// This is used to prevent errors when using the global state in the disconnect event
	useEffect(() => {
		isConnectingRef.current = isConnecting;
	}, [isConnecting]);

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

	const handleBleConnectEvent = useCallback(() => {
		Snackbar.show({
			text: `BLE connected`,
			textColor: theme.colors.success,
			duration: Snackbar.LENGTH_LONG,
			backgroundColor: theme.colors.grayscale[2],
		});
	}, [theme.colors.success, theme.colors.grayscale]);

	// Event to handle BLE disconnection error and reset the global state
	const handleBleDisconnectEvent = useCallback(() => {
		Snackbar.show({
			text: `BLE Disconnected`,
			textColor: theme.colors.success,
			duration: Snackbar.LENGTH_LONG,
			backgroundColor: theme.colors.grayscale[2],
		});
		dispatch(resetConnectedScanner());
		dispatch(setConnected(false));
		if (!isConnectingRef.current) {
			Alert.alert(
				'Connection Error.',
				'You have lost connection to the scanner during the configuration process. Make sure you are in range of the scanner and try again.',
				[{ text: 'OK' }],
			);
		}
	}, [dispatch, theme.colors.grayscale, theme.colors.success]);

	const initializeBleManager = useCallback(async () => {
		try {
			await BleManager.start({ showAlert: false });
			console.log('BleManager started');
			bleManagerEmitter.addListener(
				SCANNED_DEVICE_EVENT,
				handleDiscoverPeripheral,
			);
			bleManagerEmitter.addListener(BLE_CONNECT_EVENT, handleBleConnectEvent);
			bleManagerEmitter.addListener(
				BLE_DISCONNECT_EVENT,
				handleBleDisconnectEvent,
			);
		} catch (error) {
			console.error('Failed to initialize BleManager:', error);
		}
	}, [
		handleDiscoverPeripheral,
		handleBleConnectEvent,
		handleBleDisconnectEvent,
	]);

	useEffect(() => {
		initializeBleManager();
		return () => {
			console.log('Removing listeners');
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [initializeBleManager]);
};

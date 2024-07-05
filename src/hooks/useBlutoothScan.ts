import { useEffect, useState } from 'react';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
	getIsScanning,
	setScanning,
} from '../providers/redux/slices/globalStatusSlice'; // adjust this path as needed
import {
	requestBluetoothPermission,
	checkBluetoothPermission,
} from '@/utils/permissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface Device {
	id: string;
	name: string;
}

export const useBluetoothScan = () => {
	const [devices, setDevices] = useState<Device[]>([]);
	const isScanning = true; //useSelector(getIsScanning);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleDiscoverPeripheral = (peripheral: any) => {
			const { id, name } = peripheral;
			console.log(peripheral);
			setDevices(prevDevices => {
				const deviceExists = prevDevices.some(device => device.id === id);
				if (!deviceExists) {
					return [...prevDevices, { id, name: name || 'Unnamed device' }];
				}
				return prevDevices;
			});
		};

		const startScan = async () => {
			const permissionGranted = await checkBluetoothPermission();
			if (permissionGranted !== 'granted') {
				console.warn('Bluetooth permission not granted');
				return;
			}
			dispatch(setScanning(true));
			await BleManager.scan([], 10, true);
		};

		const stopScan = async () => {
			dispatch(setScanning(false));
			await BleManager.stopScan();
		};

		if (isScanning) {
			startScan();
			bleManagerEmitter.addListener(
				'BleManagerDiscoverPeripheral',
				handleDiscoverPeripheral,
			);
		} else {
			stopScan();
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		}

		return () => {
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
		};
	}, [dispatch, isScanning]);

	return { devices };
};

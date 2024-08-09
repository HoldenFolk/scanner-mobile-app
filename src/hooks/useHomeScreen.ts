import { useSelector } from 'react-redux';
import { useBluetoothConnect } from './useBluetoothConnect';
import { useBluetoothManager } from './useBluetoothManager';
import { useBluetoothScan } from './useBlutoothScan';
import {
	getDevices,
	getIsConnecting,
	getIsScanning,
} from '@/providers/redux/slices';

export const useHomeScreen = () => {
	useBluetoothManager(); // Init BLE manager for connection
	useBluetoothScan(); // Create effect to watch for BLE scanning status
	const { connectToScanner } = useBluetoothConnect(); // Function to connect to scanner
	const isScanning = useSelector(getIsScanning);
	const isConnecting = useSelector(getIsConnecting);
	const scannedDevices = useSelector(getDevices);

	const backgroundTitle = isScanning
		? 'Approach a Kaidu scanner and hold down the reset button until the LED illuminates white.'
		: 'Tap the Start Scan button to locate Kaidu Scanners';

	return { connectToScanner, isConnecting, scannedDevices, backgroundTitle };
};

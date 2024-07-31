import React from 'react';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import { useSelector } from 'react-redux';
import {
	getDevices,
	getIsConnecting,
	getIsScanning,
} from '@/providers/redux/slices';
import { ScannedItemList } from '@/components/organism/ScannedItemList';
import { KaiduScannedItem } from '@/components/organism/KaiduScannedItem';
import { ScannerData } from '@/types/scannerData';
import { ListRenderItem } from 'react-native';
import Appbar from '@/components/molecule/Appbar';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '@/types/navigation';
import BackgroundGroup from '@/components/molecule/BackgroundGroup';
import { BleScanButton } from '@/components/molecule/BleScanButton';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';
import { OverlayActivityIndicator } from '@/components/molecule/ActivityIndicator';
import { useBluetoothManager } from '@/hooks/useBluetoothManager';

//TODO: Move component logic to custom hook
export const Home: React.FC = () => {
	useBluetoothManager(); // Init BLE manager for connection
	useBluetoothScan(); // Create effect to watch for BLE scanning status
	const { connectToScanner } = useBluetoothConnect(); // Function to connect to scanner
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const isScanning = useSelector(getIsScanning);
	const isConnecting = useSelector(getIsConnecting);
	const scannedDevices: ScannerData[] = useSelector(getDevices);

	// Function to render each scanned item
	const renderItem: ListRenderItem<ScannerData> = ({ item }) => (
		<KaiduScannedItem scanner={item} connectToScanner={connectToScanner} />
	);

	const backgroundTitle = isScanning
		? 'Approach a Kaidu Scanner and hold down the button for 3 seconds'
		: 'Tap the Scan button to locate Kaidu Scanners';

	return (
		<BasicTemplate>
			{!isConnecting && (
				<>
					<Appbar
						title="Kaidu"
						leftComponent={
							<Icon
								type="font-awesome-5"
								name="bars"
								onPress={() => navigation.openDrawer()}
							/>
						}
					/>
					{scannedDevices.length === 0 && (
						<BackgroundGroup isShown={true} title={backgroundTitle} />
					)}
					<ScannedItemList renderItem={renderItem} data={scannedDevices} />
					<BleScanButton />
				</>
			)}

			{isConnecting && (
				<OverlayActivityIndicator
					isVisible={isConnecting}
					text={'Retrieving details for your Kaidu scanner.'}
				/>
			)}
		</BasicTemplate>
	);
};

export default Home;

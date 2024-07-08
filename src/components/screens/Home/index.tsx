import React from 'react';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import { useSelector } from 'react-redux';
import { getDevices, getIsScanning } from '@/providers/redux/slices';
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

export const Home: React.FC = () => {
	useBluetoothScan();
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const isScanning = useSelector(getIsScanning);
	const scannedDevices: ScannerData[] = useSelector(getDevices);

	// Function to render each scanned item
	const renderItem: ListRenderItem<ScannerData> = ({ item: { id } }) => (
		<KaiduScannedItem id={id} />
	);

	const backgroundTitle = isScanning
		? 'Tap the Scan button to locate Kaidu Scanners'
		: 'Approach a Kaidu Scanner and hold down the button for 3 seconds';

	return (
		<BasicTemplate>
			<Appbar
				title="Home"
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
		</BasicTemplate>
	);
};

export default Home;

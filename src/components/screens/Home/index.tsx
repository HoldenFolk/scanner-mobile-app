import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import { useSelector } from 'react-redux';
import { getDevices } from '@/providers/redux/slices';
import { ScannedItemList } from '@/components/organism/ScannedItemList';
import { KaiduScannedItem } from '@/components/organism/KaiduScannedItem';
import React from 'react';
import { ScannerData } from '@/types/scannerData';
import { ListRenderItem } from 'react-native';
import Appbar from '@/components/molecule/Appbar';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '@/types/navigation';

export const Home: React.FC = () => {
	useBluetoothScan();
	//Global state
	const scannedDevices: ScannerData[] = useSelector(getDevices);
	const renderItem: ListRenderItem<ScannerData> = ({ item: { id } }) => (
		<KaiduScannedItem id={id} />
	);
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

	console.log(JSON.stringify(scannedDevices, null, 2));

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
			<ScannedItemList renderItem={renderItem} data={scannedDevices} />
		</BasicTemplate>
	);
};

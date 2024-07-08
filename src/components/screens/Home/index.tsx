import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import { useSelector } from 'react-redux';
import { getDevices } from '@/providers/redux/slices';
import { ScannedItemList } from '@/components/organism/ScannedItemList';
import { KaiduScannedItem } from '@/components/molecule/KaiduScannedItem';
import React from 'react';
import { ScannerData } from '@/types/scannerData';
import { ListRenderItem } from 'react-native';

export const Home: React.FC = () => {
	useBluetoothScan();
	//Global state
	const scannedDevices: ScannerData[] = useSelector(getDevices);
	const renderItem: ListRenderItem<ScannerData> = ({ item }) => (
		<KaiduScannedItem id={item} />
	);

	console.log(JSON.stringify(scannedDevices, null, 2));

	return (
		<BasicTemplate>
			<ScannedItemList renderItem={renderItem} data={scannedDevices} />
		</BasicTemplate>
	);
};

import React from 'react';
import { BasicTemplate } from '@/components/template/BasicTemplate';
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
import { OverlayActivityIndicator } from '@/components/molecule/ActivityIndicator';
import { useHomeScreen } from '@/hooks/useHomeScreen';

export const Home: React.FC = () => {
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const { connectToScanner, isConnecting, scannedDevices, backgroundTitle } =
		useHomeScreen();

	// Function to render each scanned item
	const renderItem: ListRenderItem<ScannerData> = ({ item }) => (
		<KaiduScannedItem scanner={item} connectToScanner={connectToScanner} />
	);

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

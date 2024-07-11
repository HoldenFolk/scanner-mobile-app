import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsConnecting, setScanning } from '@/providers/redux/slices';
import { ScannedItemUI } from '@/components/molecule/scannerItem/ScannedItemUI';
import { ScannerData } from '@/types/scannerData';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '@/types/navigation';
import { STACK_SCREENS } from '@/navigation/routes';

interface KaiduScannedItemProps {
	scanner: ScannerData;
	connectToScanner: (id: string) => void;
}

export const KaiduScannedItem = ({
	scanner,
	connectToScanner,
}: KaiduScannedItemProps) => {
	const isDisabled = useSelector(getIsConnecting);
	const dispatch = useDispatch();
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

	/**
	 * prepare and execute device connection
	 */
	const handlePress = async () => {
		dispatch(setScanning(false));
		await connectToScanner(scanner.id);
		navigation.navigate(STACK_SCREENS.WIFI.PARENT as keyof RootParamList);
	};

	return (
		<ScannedItemUI
			macAddress={scanner.id}
			onPress={handlePress}
			disabled={isDisabled}
			data={scanner}
		/>
	);
};

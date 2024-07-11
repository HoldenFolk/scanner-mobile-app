import View from '@/components/atomic/View';
import ActivityIndicator from '@/components/molecule/ActivityIndicator';
import WifiSelectionModal from '@/components/molecule/wifiConfig/WifiSelectionModal';
import {
	getConnectedDeviceWifiList,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import React from 'react';
import { useSelector } from 'react-redux';

export function WifiSelectionModalScreen() {
	const wifiOptions = useSelector(getConnectedDeviceWifiList);
	const currentSsid = useSelector(getConnectedDeviceWifiSSID);
	const handlePressToChangePassword = () => {
		console.log(
			'file: WifiSelectionModalScreen.tsx:70 ~ handlePressToChangePassword ~ option:',
		);
	};
	const isLoadingWifiList = false;

	const handleOtherWifiNavigation = () => {
		// navigation.navigate(STACK_SCREENS.WIFI.PARENT, {
		// 	screen: STACK_SCREENS.WIFI.OTHER,
		// 	params: { ssid: '', bleId },
		// 	merge: true,
		// });
	};

	if (isLoadingWifiList) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator isVisible={true} />
			</View>
		);
	}

	return (
		<>
			<WifiSelectionModal
				wifiOptions={wifiOptions}
				onPasswordChangeNavigation={handlePressToChangePassword}
				onOtherWifiNavigation={handleOtherWifiNavigation}
				currentSsid={currentSsid}
			/>
		</>
	);
}

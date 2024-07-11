import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import View from '@/components/atomic/View';
import ActivityIndicator from '@/components/molecule/ActivityIndicator';
import WifiSelectionModal from '@/components/molecule/wifiConfig/WifiSelectionModal';
import {
	getConnectedDeviceWifiList,
	getConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';

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
		//  screen: STACK_SCREENS.WIFI.OTHER,
		//  params: { ssid: '', bleId },
		//  merge: true,
		// });
	};

	if (isLoadingWifiList) {
		return (
			<CenteredView>
				<ActivityIndicator isVisible={true} />
			</CenteredView>
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

// Styled-components
const CenteredView = styled(View)`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

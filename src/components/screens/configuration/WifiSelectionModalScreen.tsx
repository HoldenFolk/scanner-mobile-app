import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import View from '@/components/atomic/View';
import ActivityIndicator from '@/components/molecule/ActivityIndicator';
import WifiSelectionModal from '@/components/molecule/wifiConfig/WifiSelectionModal';
import {
	getConnectedDeviceWifiList,
	getConnectedDeviceWifiSSID,
	getIsLoadingWifiList,
	setConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import { Wifi } from '@/types/scannerData';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootParamList } from '@/types/navigation';
import { routes } from '@/navigation/routes';

export function WifiSelectionModalScreen() {
	const wifiOptions = useSelector(getConnectedDeviceWifiList);
	const currentSsid = useSelector(getConnectedDeviceWifiSSID);
	const isLoadingWifiList = useSelector(getIsLoadingWifiList);
	const navigation = useNavigation<NavigationProp<RootParamList>>();
	const dispatch = useDispatch();

	const handlePressToChangePassword = (wifi: Wifi) => {
		console.log('Set wifi ssid in global state', wifi.ssid);
		routes.PasswordModal(navigation);
		dispatch(setConnectedDeviceWifiSSID(wifi.ssid));
	};

	// TODO: Implement
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

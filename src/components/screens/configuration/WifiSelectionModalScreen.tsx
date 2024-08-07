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
import useAppNavigation from '@/hooks/useAppNavigation';

export function WifiSelectionModalScreen() {
	const wifiOptions = useSelector(getConnectedDeviceWifiList);
	const currentSsid = useSelector(getConnectedDeviceWifiSSID);
	const isLoadingWifiList = useSelector(getIsLoadingWifiList);
	const { PasswordModal, OtherModal } = useAppNavigation();
	const dispatch = useDispatch();

	const handlePressToChangePassword = (wifi: Wifi) => {
		PasswordModal();
		dispatch(setConnectedDeviceWifiSSID(wifi.ssid));
	};

	const handlePressOther = () => {
		OtherModal();
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
				handlePressOther={handlePressOther}
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

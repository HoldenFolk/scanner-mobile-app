import {
	getConnectedDeviceId,
	getConnectedDevicePlugState,
	getConnectedDeviceWifiList,
} from '@/providers/redux/slices';
import { ConfigurationSetting } from '../../organism/ConfigurationSetting';
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';
import useAppNavigation from '@/hooks/useAppNavigation';

/**
 * Configuration screen in simplified app
 */
export function Configuration() {
	// Global states
	const bleId = useSelector(getConnectedDeviceId);
	const plugState = useSelector(getConnectedDevicePlugState);
	const wifilist = useSelector(getConnectedDeviceWifiList);

	const { GeolocationModal, WifiSelectionModal, Home } = useAppNavigation();

	const handleGeolocationNavigation = () => {
		console.log('Navigate to Geolocation config');
		GeolocationModal();
	};

	const handleWifiSelectionNavigation = () => {
		console.log('Navigate to WifiSelectionModalScreen with data');
		WifiSelectionModal();
	};

	return (
		<ErrorBoundary onError={() => Home()}>
			<ConfigurationSetting
				id={bleId}
				plugState={plugState}
				wifiList={wifilist}
				onNavigation={handleGeolocationNavigation}
				onWifiSelect={handleWifiSelectionNavigation}
			/>
		</ErrorBoundary>
	);
}

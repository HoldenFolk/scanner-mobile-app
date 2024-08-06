import {
	getConnectedDeviceId,
	getConnectedDeviceMacAddress,
	getConnectedDevicePlugState,
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
	const macAddress = useSelector(getConnectedDeviceMacAddress);

	const { GeolocationModal, WifiSelectionModal, Home } = useAppNavigation();

	const handleGeolocationNavigation = () => {
		GeolocationModal();
	};

	const handleWifiSelectionNavigation = () => {
		WifiSelectionModal();
	};

	return (
		<ErrorBoundary onError={() => Home()}>
			<ConfigurationSetting
				id={bleId}
				macAddress={macAddress}
				plugState={plugState}
				onNavigation={handleGeolocationNavigation}
				onWifiSelect={handleWifiSelectionNavigation}
			/>
		</ErrorBoundary>
	);
}

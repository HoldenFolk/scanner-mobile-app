import {
	getConnectedDeviceId,
	getConnectedDevicePlugState,
	getConnectedDeviceWifiList,
	setConfigState,
} from '@/providers/redux/slices';
import { ConfigurationSetting } from '../../organism/ConfigurationSetting';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';
import { AsyncLifecycle } from '@/types/scannerData';
import useAppNavigation from '@/hooks/useAppNavigation';

/**
 * Configuration screen in simplified app
 */
export function Configuration() {
	// Hooks
	const dispatch = useDispatch();

	// Global states
	const bleId = useSelector(getConnectedDeviceId);
	const plugState = useSelector(getConnectedDevicePlugState);
	const wifilist = useSelector(getConnectedDeviceWifiList);

	const { Setup, WifiSelectionModal, Home } = useAppNavigation();

	const handleSetupNavigation = () => {
		console.log('Navigate to Setup with data');
		dispatch(setConfigState(AsyncLifecycle.PENDING));
		Setup();
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
				onNavigation={handleSetupNavigation}
				onWifiSelect={handleWifiSelectionNavigation}
			/>
		</ErrorBoundary>
	);
}

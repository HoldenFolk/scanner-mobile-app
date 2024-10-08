import useAppNavigation from '@/hooks/useAppNavigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeolocationSetting } from '@/components/organism/GeolocationSetting';
import ErrorBoundary from 'react-native-error-boundary';
import {
	getConnectedDeviceMacAddress,
	setConfigState,
	setConnectedDeviceGeolocation,
} from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';
import { Geolocation } from '@/types/api';

export const GeolocationModalScreen = () => {
	const dispatch = useDispatch();

	// Global states
	const macAddress = useSelector(getConnectedDeviceMacAddress);

	const { Setup, Home } = useAppNavigation();

	const handleSetupNavigation = () => {
		dispatch(setConfigState(AsyncLifecycle.PENDING));
		Setup();
	};

	const handleUpdateGloablGeolocation = (geolocation: Geolocation) => {
		dispatch(setConnectedDeviceGeolocation(geolocation));
	};

	return (
		<ErrorBoundary onError={() => Home()}>
			<GeolocationSetting
				navigateToSetup={handleSetupNavigation}
				updateGlobalGeolocation={handleUpdateGloablGeolocation}
				macAddress={macAddress}
			/>
		</ErrorBoundary>
	);
};

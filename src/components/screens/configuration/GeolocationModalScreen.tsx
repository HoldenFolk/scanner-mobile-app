import useAppNavigation from '@/hooks/useAppNavigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { GeoLocationSetting } from '@/components/organism/GeoLocationSetting';
import ErrorBoundary from 'react-native-error-boundary';
import { setConfigState } from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';

export const GeolocationModalScreen = () => {
	const dispatch = useDispatch();

	const { Setup, Home } = useAppNavigation();

	const handleSetupNavigation = () => {
		console.log('Navigate to Setup with data');
		dispatch(setConfigState(AsyncLifecycle.PENDING));
		Setup();
	};

	return (
		<ErrorBoundary onError={() => Home()}>
			<GeoLocationSetting navigateToSetup={handleSetupNavigation} />
		</ErrorBoundary>
	);
};

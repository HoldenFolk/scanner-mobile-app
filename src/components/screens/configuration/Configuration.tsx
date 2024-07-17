import {
	getConnectedDeviceId,
	getConnectedDevicePlugState,
	getConnectedDeviceWifiList,
	setConfigState,
} from '@/providers/redux/slices';
import { RootParamList } from '@/types/navigation';
import { ConfigurationSetting } from '../../organism/ConfigurationSetting';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';
import { routes } from '@/navigation/routes';
import { AsyncLifecycle } from '@/types/scannerData';

/**
 * Configuration screen in simplified app
 */
export function Configuration() {
	// Hooks
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const dispatch = useDispatch();

	// Global states
	const bleId = useSelector(getConnectedDeviceId);
	const plugState = useSelector(getConnectedDevicePlugState);
	const wifilist = useSelector(getConnectedDeviceWifiList);

	const handleSetupNavigation = () => {
		console.log('Navigate to Setup with data');
		dispatch(setConfigState(AsyncLifecycle.PENDING));
		routes.setup(navigation);
	};

	const handleWifiSelectionNavigation = () => {
		console.log('Navigate to WifiSelectionModalScreen with data');
		routes.WifiSelectionModal(navigation);
	};

	return (
		<ErrorBoundary onError={() => routes.Home(navigation)}>
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

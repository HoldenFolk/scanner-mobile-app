import { resetToHome } from '@/navigation/processors';
import {
	getConnectedDeviceId,
	getConnectedDevicePlugState,
	getConnectedDeviceWifiList,
} from '@/providers/redux/slices';
import { RootParamList } from '@/types/navigation';
import { ConfigurationSetting } from '../../organism/ConfigurationSetting';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';
import { routes } from '@/navigation/routes';

/**
 * Configuration screen in simplified app
 */
export function Configuration() {
	// Hooks
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

	// Global states
	const bleId = useSelector(getConnectedDeviceId);
	const plugState = useSelector(getConnectedDevicePlugState);
	const wifilist = useSelector(getConnectedDeviceWifiList);

	const handleSetupNavigation = () => {
		console.log('Navigate to Setup with data');
		routes.WifiSelectionModal(navigation);
	};

	return (
		<ErrorBoundary onError={() => navigation.dispatch(resetToHome)}>
			<ConfigurationSetting
				id={bleId}
				plugState={plugState}
				wifiList={wifilist}
				onNavigation={handleSetupNavigation}
			/>
		</ErrorBoundary>
	);
}

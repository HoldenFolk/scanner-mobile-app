import { resetToHome } from '@/navigation/processors';
import {
	getConnectedDeviceId,
	getConnectedDeviceWifiList,
	getDeviceById,
} from '@/providers/redux/slices';
import { RootParamList } from '@/types/navigation';
import { ConfigurationSetting } from './ConfigurationSetting';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'react-native-error-boundary';

/**
 * Configuration screen in simplified app
 */
export function Configuration() {
	// Hooks
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

	// Global states
	const bleId = useSelector(getConnectedDeviceId);
	const wifilist = useSelector(getConnectedDeviceWifiList);
	const device = useSelector(state => getDeviceById(state, bleId));

	const handleSetupNavigation = () => {
		console.log('Navigate to Setup with data');
	};

	const handleWifiChangeNavigation = () => {
		console.log('handleWifiChangeNavigation is called');
	};

	return (
		<ErrorBoundary onError={() => navigation.dispatch(resetToHome)}>
			<ConfigurationSetting
				device={device}
				wifiList={wifilist}
				onNavigation={handleSetupNavigation}
				onWifiChangeNavigation={handleWifiChangeNavigation}
			/>
		</ErrorBoundary>
	);
}

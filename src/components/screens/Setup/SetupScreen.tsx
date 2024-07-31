import { SetupStepsContainer } from '@/components/organism/SetupStepsContainer';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import useAppNavigation from '@/hooks/useAppNavigation';
import {
	getConnectedDeviceId,
	getConnectedDeviceMacAddress,
} from '@/providers/redux/slices';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { useSelector } from 'react-redux';

export const Setup = () => {
	const { Home } = useAppNavigation();
	const bleId = useSelector(getConnectedDeviceId);
	const macAddress = useSelector(getConnectedDeviceMacAddress);

	return (
		<ErrorBoundary onError={() => Home()}>
			<BasicTemplate>
				<SetupStepsContainer bleId={bleId} macAddress={macAddress} />
			</BasicTemplate>
		</ErrorBoundary>
	);
};

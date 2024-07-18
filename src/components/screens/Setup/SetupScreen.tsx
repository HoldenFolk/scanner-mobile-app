import { SetupStepsContainer } from '@/components/organism/SetupStepsContainer';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import useAppNavigation from '@/hooks/useAppNavigation';
import { getConnectedDeviceId } from '@/providers/redux/slices';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { useSelector } from 'react-redux';

export const Setup = () => {
	const { Home } = useAppNavigation();
	const bleId = useSelector(getConnectedDeviceId);

	return (
		<ErrorBoundary onError={() => Home()}>
			<BasicTemplate>
				<SetupStepsContainer bleId={bleId} />
			</BasicTemplate>
		</ErrorBoundary>
	);
};

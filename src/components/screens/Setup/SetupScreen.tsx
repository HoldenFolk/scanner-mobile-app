import { SetupStepsContainer } from '@/components/organism/SetupStepsContainer';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { routes } from '@/navigation/routes';
import { getConnectedDeviceId } from '@/providers/redux/slices';
import { RootParamList } from '@/types/navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { useSelector } from 'react-redux';

export const Setup = () => {
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const bleId = useSelector(getConnectedDeviceId);

	return (
		<ErrorBoundary onError={() => routes.Home(navigation)}>
			<BasicTemplate>
				<SetupStepsContainer bleId={bleId} />
			</BasicTemplate>
		</ErrorBoundary>
	);
};

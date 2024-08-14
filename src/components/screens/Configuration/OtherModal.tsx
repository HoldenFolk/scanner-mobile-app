import React from 'react';
import { WifiConfigFormManual } from '@/components/organism/WifiConfigFormManual';
import { useWifiConfigForm } from '@/hooks/useWifiConfigForm';
import useAppNavigation from '@/hooks/useAppNavigation';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { View } from '@/components/atomic/View';
import { styled } from 'styled-components/native';

const OtherModal = () => {
	const { GeolocationModal } = useAppNavigation();

	const handleGeolocationNavigation = () => {
		GeolocationModal();
	};

	const formManual = useWifiConfigForm({
		onNavigation: handleGeolocationNavigation,
	});
	return (
		<BasicTemplate>
			<Container>
				<WifiConfigFormManual form={formManual} />
			</Container>
		</BasicTemplate>
	);
};

export default OtherModal;

const Container = styled(View)`
	flex: 1;
	justify-content: space-between;
	padding: 16px;
`;

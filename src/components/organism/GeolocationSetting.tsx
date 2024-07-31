import React from 'react';
import { BasicTemplate } from '../template/BasicTemplate';
import styled from 'styled-components/native';
import View from '../atomic/View';
import { Text } from '../atomic/Text';
import GeolocationDisplay from '../molecule/GeolocationDisplay';
import { Geolocation } from '@/types/api';

interface GeolocationSettingProps {
	navigateToSetup: () => void;
	updateGlobalGeolocation: (geolocation: Geolocation) => void;
	macAddress: string;
}

export const GeolocationSetting = ({
	navigateToSetup,
	updateGlobalGeolocation,
	macAddress,
}: GeolocationSettingProps) => {
	return (
		<BasicTemplate>
			<Container>
				<CenteredView>
					<Row>
						<StyledText>{'MAC:'}</StyledText>
						<StyledText>{macAddress}</StyledText>
					</Row>
				</CenteredView>

				<GeolocationDisplay
					navigateToSetup={navigateToSetup}
					updateGlobalGeolocation={updateGlobalGeolocation}
				/>
			</Container>
		</BasicTemplate>
	);
};

const Container = styled(View)`
	flex: 1;
	padding: 16px;
	justify-content: space-between;
`;

const CenteredView = styled(View)`
	align-items: center;
`;

const Row = styled(View)`
	background-color: transparent;
	flex-direction: row;
`;

const StyledText = styled(Text)`
	font-size: 18px;
	min-width: 60px;
`;

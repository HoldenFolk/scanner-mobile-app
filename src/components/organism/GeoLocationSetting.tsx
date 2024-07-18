import React from 'react';
import { BasicTemplate } from '../template/BasicTemplate';
import { Heading } from '../atomic/Heading';
import styled from 'styled-components/native';
import View from '../atomic/View';
import { Text } from '../atomic/Text';

interface GeoLocationSettingProps {
	navigateToSetup: () => void;
	bleId: string;
}

export const GeoLocationSetting = ({
	navigateToSetup,
	bleId,
}: GeoLocationSettingProps) => {
	return (
		<BasicTemplate>
			<Container>
				<CenteredView>
					<Row>
						<StyledText>{'MAC:'}</StyledText>
						<StyledText>{bleId}</StyledText>
					</Row>
				</CenteredView>
				<Heading>GeoLocation Setting</Heading>
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

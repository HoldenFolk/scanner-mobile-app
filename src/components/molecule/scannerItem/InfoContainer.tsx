import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from '../../atomic/Icon';
import { LabelText, Text } from '../../atomic/Text';
import { RSSIStrengthIcon } from './RSSIStrengthIcon';
import { ScannerData } from '@/types/ScannerData';
import styled from 'styled-components/native';
import { View } from 'react-native';

interface InfoContainerProps {
	data: ScannerData;
	macAddress: string;
	isLoadingName?: boolean;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
	data,
	macAddress,
	isLoadingName,
}) => {
	const theme = useTheme();

	return (
		<Container>
			{data.name || isLoadingName ? (
				<Row>
					<StyledText>
						Name: {isLoadingName ? 'Loading...' : data.name}
					</StyledText>
				</Row>
			) : null}
			<Row>
				<LabelText text="MAC:" />
				<StyledText>{macAddress || 'Not available'}</StyledText>
			</Row>
			<Row>
				<Icon
					name="signal"
					type="font-awesome-5"
					size={10}
					color={theme.colors.fourth}
				/>
				<StyledText>{`${data.rssi || 'N/A'} dBm`}</StyledText>
				<RSSIStrengthIcon value={data.wifiRssi} />
			</Row>
		</Container>
	);
};

export default InfoContainer;

// Styled components
const Container = styled(View)`
	background-color: transparent;
	flex-grow: 1;
	flex-shrink: 1;
`;

const Row = styled(View)`
	background-color: transparent;
	flex-direction: row;
	margin-bottom: 4px;
	align-items: center;
`;

const StyledText = styled(Text)`
	color: ${({ theme }) => theme.colors.tertiary};
	flex-wrap: wrap;
`;

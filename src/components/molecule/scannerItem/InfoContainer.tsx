import React from 'react';
import { Text } from '../../atomic/Text';
import { RSSIStrengthIcon } from './RSSIStrengthIcon';
import { ScannerData } from '@/types/ScannerData';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';

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
				<StyledText>MAC: {macAddress || 'Not available'}</StyledText>
			</Row>
			<Row>
				<StyledText>Signal: {`${data.rssi || 'N/A'} dBm`}</StyledText>
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
	font-size: ${scale(14)}px;
	margin-right: 8px;
`;

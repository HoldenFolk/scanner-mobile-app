import React from 'react';
import { DeviceIcon } from './DeviceIcon';
import { useTheme } from 'styled-components/native';
import { TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { ScannerData } from '@/types/ScannerData';
import styled from 'styled-components/native';
import { PlugState } from '@/types/scannerData';
import InfoContainer from './InfoContainer';
import { PlugStateIcon } from './PlugStateIcon';
import View from '../atomic/View';

interface ScannedItemUIProps extends TouchableHighlightProps {
	macAddress: string;
	onPress: () => void;
	data: ScannerData;
	configurationStatus?: 'other' | 'configured' | 'unconfigured' | undefined;
	isLoadingName?: boolean;
}

export function ScannedItemUI({
	macAddress,
	onPress,
	data,
	configurationStatus,
	isLoadingName,
	children,
	...rest
}: ScannedItemUIProps) {
	const theme = useTheme();
	const isDarkMode = theme?.name === 'dark';
	const bgColor = theme?.colors?.primary;
	const plugStateColor =
		data.plugState === PlugState.CONNECTED
			? theme?.colors?.success
			: theme?.colors?.danger;

	return (
		<Container plugStateColor={plugStateColor} isDarkMode={isDarkMode}>
			<CustomTouchableHighlight
				onPress={onPress}
				underlayColor={bgColor}
				bgColor={bgColor}
				{...rest}
			>
				<Content>
					<DeviceIcon
						type={data.kaiduDeviceType}
						configurationStatus={configurationStatus}
					/>
					<InfoContainer
						data={data}
						macAddress={macAddress}
						isLoadingName={isLoadingName}
					/>
					<PlugStateContainer>
						{data.plugState && <PlugStateIcon type={data.plugState} />}
					</PlugStateContainer>
					{children}
				</Content>
			</CustomTouchableHighlight>
		</Container>
	);
}

export default ScannedItemUI;

// Styled components
const Container = styled(View)<{ plugStateColor: string; isDarkMode: boolean }>`
	margin: 8px;
	padding-left: 16px;
	background-color: ${({ plugStateColor }) => plugStateColor};
	border-radius: 14px;
	shadow-color: ${({ isDarkMode }) => (isDarkMode ? '#fff' : '#000')};
	shadow-offset: 0px 4px;
	shadow-opacity: 0.25;
	shadow-radius: 4px;
	elevation: 10;
`;

const CustomTouchableHighlight = styled(TouchableHighlight)<{
	bgColor: string;
}>`
	background-color: ${({ bgColor }) => bgColor};
	border-radius: 14px;
`;

const Content = styled(View)`
	height: 144px;
	padding: 8px;
	background-color: transparent;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const PlugStateContainer = styled(View)`
	height: 100%;
	justify-content: center;
	background-color: transparent;
	margin-right: 16px;
`;

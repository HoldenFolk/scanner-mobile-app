import React from 'react';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { getConnectedDeviceWifiSSID } from '@/providers/redux/slices';
import { BasicListItem } from '../ListItem';
import styled from 'styled-components/native';
import { Text } from '@/components/atomic/Text';
import Icon from '@/components/atomic/Icon';

const Container = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: transparent;
`;

function ForwardIcon() {
	const theme = useTheme();
	return (
		<Icon
			name="chevron-forward-outline"
			type="ionicon"
			color={theme.colors.tertiary}
		/>
	);
}

/**
 * Press to start to set Wi-Fi
 */
export function WifiListItem({ onPress }: { onPress: () => void }) {
	const currentSsid = useSelector(getConnectedDeviceWifiSSID);

	const handlePress = () => {
		console.log('Open list of wifi');
		onPress();
	};

	console.log(
		'file: WifiListItem.tsx:62 ~ WifiListItem ~ currentSsid:',
		currentSsid,
	);

	return (
		<BasicListItem
			title={'Wi-Fi:'}
			onPress={handlePress}
			rightComponent={
				<Container>
					<Text>{currentSsid || 'Not Configured'}</Text>
					<ForwardIcon />
				</Container>
			}
		/>
	);
}

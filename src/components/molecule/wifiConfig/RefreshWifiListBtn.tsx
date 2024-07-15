import Icon from '@/components/atomic/Icon';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';
import {
	getConnectedDeviceId,
	getIsConnecting,
	getIsLoadingWifiList,
} from '@/providers/redux/slices';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

const RefreshWifiListBtn = () => {
	const theme = useTheme();
	const { retrieveWifiList } = useBluetoothConnect();

	// Global State
	const isConnecting = useSelector(getIsConnecting);
	const isLoadingWifiList = useSelector(getIsLoadingWifiList);
	const id = useSelector(getConnectedDeviceId);
	const isLoading = isConnecting || isLoadingWifiList;

	const handlePress = async () => {
		await retrieveWifiList(id);
	};

	return (
		<Button onPress={handlePress} disabled={isLoading}>
			<Icon
				name="refresh"
				type={'material'}
				color={isLoading ? theme.colors.grayscale[4] : theme.colors.primary}
			/>
		</Button>
	);
};

const Button = styled(TouchableOpacity)`
	padding: 0 8px;
	background-color: transparent;
`;

export default RefreshWifiListBtn;

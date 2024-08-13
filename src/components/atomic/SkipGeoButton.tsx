import Icon from '@/components/atomic/Icon';
import useAppNavigation from '@/hooks/useAppNavigation';
import { setConfigState } from '@/providers/redux/slices';
import { AsyncLifecycle } from '@/types/scannerData';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components/native';

const SkipGeoButton = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { Setup } = useAppNavigation();

	const handlePress = () => {
		dispatch(setConfigState(AsyncLifecycle.PENDING));
		Setup(); // Navigate to the Setup screen
	};

	return (
		<Button onPress={handlePress}>
			<Icon name="skip-next" type={'material'} color={theme.colors.primary} />
		</Button>
	);
};

const Button = styled(TouchableOpacity)`
	padding: 0 8px;
	background-color: transparent;
`;

export default SkipGeoButton;

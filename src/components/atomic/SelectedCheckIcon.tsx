import React from 'react';
import { View } from './View';
import Icon from './Icon';
import styled from 'styled-components/native';

export const SelectedCheckIcon = () => {
	return (
		<LeftComponentView>
			<Icon name="check-circle" type="font-awesome-5" size={26} />
		</LeftComponentView>
	);
};

const LeftComponentView = styled(View)`
	width: 28px;
	background-color: transparent;
`;

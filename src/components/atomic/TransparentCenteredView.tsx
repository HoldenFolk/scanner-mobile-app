import React from 'react';
import { styled } from '@kaidu/shared/lib/styles';
import { View } from './View';

const StyledView = styled(View)`
	background-color: transparent;
	align-items: center;
	justify-content: center;
`;

export default function TransparentCenteredView(props) {
	return <StyledView {...props} />;
}

import React from 'react';
import { styled } from '@kaidu/shared/lib/styles';
import { Text } from './Text';

const MyLabel = styled(Text)`
	justify-content: center;
	font-weight: bold;
	color: ${props => props?.theme?.colors?.fourth};
	max-width: 100%;
`;

export function Label(props) {
	const { children, ...rest } = props;

	return <MyLabel {...rest}>{children}</MyLabel>;
}

export default Label;

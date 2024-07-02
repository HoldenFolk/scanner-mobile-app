import React from 'react';
import { scale, useTheme, styled, tailwind } from '@kaidu/shared/lib/styles';
import { Text, BASE_SIZE } from './Text';

export const BaseHeading = styled(Text)`
	text-align: center;
	color: ${props => props.theme.colors.fourth};
`;

export const Heading = styled(Text)`
	text-align: center;
	color: ${props => props?.theme?.colors.secondary};
	font-size: ${BASE_SIZE * 1.6}px;
	font-weight: bold;
`;

export function H2({ ...optionals }) {
	const { style, ...rest } = optionals;
	return (
		<Text
			style={[{ fontSize: scale(20), fontWeight: 'bold' }, style]}
			{...rest}
		/>
	);
}

export function ModalTitle({ children, ...optionals }) {
	const theme = useTheme();
	return (
		<Heading
			style={[tailwind('mb-4 mt-4'), { color: theme?.colors?.tertiary }]}
		>
			{children}
		</Heading>
	);
}

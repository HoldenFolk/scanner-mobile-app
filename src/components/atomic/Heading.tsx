import React from 'react';
import { styled } from 'styled-components/native';
import { Text, BASE_SIZE } from './Text';
import { scale } from 'react-native-size-matters';
import { TextProps } from 'react-native';

export function H2(props: TextProps) {
	return <StyledH2 {...props} />;
}

export function ModalTitle({
	children,
	...props
}: {
	children: React.ReactNode;
}) {
	return <StyledModalTitle {...props}>{children}</StyledModalTitle>;
}

export const BaseHeading = styled(Text)`
	text-align: center;
	color: ${props => props.theme.colors.fourth};
`;

export const Heading = styled(Text)`
	text-align: center;
	color: ${props => props.theme.colors.secondary};
	font-size: ${BASE_SIZE * 1.6}px;
	font-weight: bold;
`;

const StyledH2 = styled(Text)`
	font-size: ${scale(20)}px;
	font-weight: bold;
`;

const StyledModalTitle = styled(Heading)`
	margin-bottom: ${scale(4)}px;
	margin-top: ${scale(4)}px;
	color: ${props => props.theme.colors.tertiary};
`;

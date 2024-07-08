import React from 'react';
import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { scale } from 'react-native-size-matters';

export const BASE_SIZE = 14;

const StyledText = styled(NativeText)`
	font-size: 16px;
	color: ${props => props.theme?.colors?.secondary};
`;

interface TextProps extends NativeTextProps {}

export function Text(props: TextProps) {
	return <StyledText {...props} style={props.style} />;
}

interface TestTextProps extends NativeTextProps {}

export function TestText(props: TestTextProps) {
	return <NativeText {...props}>This text comes from @kaidu/shared</NativeText>;
}

interface LabelTextProps extends NativeTextProps {
	text: string;
}

export function LabelText({ text, ...optionals }: LabelTextProps) {
	const minWidth = scale(30);
	const theme = useTheme();

	return (
		<Text {...optionals} style={[{ color: theme?.colors?.tertiary, minWidth }]}>
			{text}
		</Text>
	);
}

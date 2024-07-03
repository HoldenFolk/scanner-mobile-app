import React from 'react';
import { Text as NativeText, TextProps as NativeTextProps } from 'react-native';
import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';

export const BASE_SIZE = 14;

interface StyledTextProps extends NativeTextProps {
	theme?: {
		colors?: {
			secondary?: string;
		};
	};
}

const StyledText = styled(NativeText)<StyledTextProps>`
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
	theme?: {
		colors?: {
			tertiary?: string;
		};
	};
}

export function LabelText({ text, ...optionals }: LabelTextProps) {
	const minWidth = scale(50);

	return (
		<Text
			{...optionals}
			style={[{ color: optionals.theme?.colors?.tertiary, minWidth }]}
		>
			{text}
		</Text>
	);
}

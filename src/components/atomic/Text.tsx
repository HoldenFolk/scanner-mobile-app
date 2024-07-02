import React from 'react';
// import {Text as ElementsText} from 'react-native-elements';
import { Text as NativeText } from 'react-native';
import { styled } from '@kaidu/shared/lib/styles';
import { useTheme } from '@kaidu/shared/lib/styles';
import { scale } from '@kaidu/shared/lib/styles';

export const BASE_SIZE = 14;

/* color: ${props => props.theme.colors.tertiary}; */
const StyledText = styled(NativeText)`
	font-size: 16px;
	color: ${props => props?.theme?.colors?.secondary};
`;

export function Text(props) {
	return <StyledText {...props} style={props.style} />;
}

export function TestText(props) {
	return <NativeText {...props}>This text comes from @kaidu/shared</NativeText>;
}

export function LabelText({ text, ...optionals }) {
	// Hooks
	const theme = useTheme();
	// const minWidth = 60;
	const minWidth = scale(50);

	return (
		<Text style={[{ color: theme?.colors?.tertiary, minWidth }]}>{text}</Text>
	);
}

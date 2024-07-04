import React from 'react';
import { View as AtomicView } from '../atomic/View';
import { Text as AtomicText } from '../atomic/Text';
import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

const CenteredView = styled(AtomicView)`
	align-items: center;
	background-color: transparent;
`;

const StyledText = styled(AtomicText)`
	font-size: 14px; /* Tailwind 'text-sm' corresponds to 14px */
	color: ${props => props.theme.colors.fourth};
	opacity: 0.7;
`;

interface VersionTextProps extends ViewProps {
	text: string;
	style?: object;
}

export function VersionText({ text, style, ...rest }: VersionTextProps) {
	return (
		<CenteredView style={style} {...rest}>
			<StyledText>Version {text}</StyledText>
		</CenteredView>
	);
}

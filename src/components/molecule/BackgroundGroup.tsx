import React from 'react';
import styled from 'styled-components/native';
import { Text as AtomicText } from '../atomic/Text';
import { View as AtomicView } from '../atomic/View';
import { Heading as AtomicHeading } from '../atomic/Heading';
import { ViewProps } from 'react-native';

/**
 *  A group of UI elements to be shown on the background
 */
interface BackgroundGroupProps extends ViewProps {
	title: string;
	isShown?: boolean;
	subtitle?: string;
}

export function BackgroundGroup({
	title,
	isShown,
	subtitle,
	...optionals
}: BackgroundGroupProps) {
	if (!isShown) {
		return <StyledTransparentView />;
	}

	return (
		<StyledContainer {...optionals}>
			<StyledHeading>{title}</StyledHeading>
			<StyledText>{subtitle}</StyledText>
		</StyledContainer>
	);
}

export default BackgroundGroup;

// Styled components
const StyledTransparentView = styled(AtomicView)`
	flex-grow: 1;
	background-color: transparent;
`;

const StyledContainer = styled(AtomicView)`
	width: 100%;
	align-items: center;
	flex-grow: 1;
	justify-content: center;
	padding: 32px;
	background-color: transparent;
`;

const StyledHeading = styled(AtomicHeading)`
	text-align: center;
`;

const StyledText = styled(AtomicText)`
	text-align: center;
	margin-top: 12px;
	margin-bottom: 16px;
`;

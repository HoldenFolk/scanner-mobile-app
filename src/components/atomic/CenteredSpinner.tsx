import React from 'react';
import { Spinner } from './Spinner';
import styled from 'styled-components/native';
import { Text } from './Text';
import { useWindowDimensions } from 'react-native';

const Container = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	background-color: transparent;
`;

const StyledText = styled(Text)<{ maxWidth: number }>`
	color: ${props => props.theme?.colors?.primary};
	max-width: ${props => props.maxWidth}px;
`;

/**
 * Spinner wrapped in a centered view
 */
export function CenteredSpinner(props: { text?: string; color?: string }) {
	const { text = 'Loading', color } = props;
	const { width: windowWidth } = useWindowDimensions();
	const maxWidth = Math.floor(windowWidth * 0.8);

	return (
		<Container>
			<Spinner color={color} />
			{text ? <StyledText maxWidth={maxWidth}>{text}</StyledText> : null}
		</Container>
	);
}

export default CenteredSpinner;

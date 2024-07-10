import React from 'react';
import { View } from '../atomic/View';
import * as Progress from 'react-native-progress';
import styled from 'styled-components/native';
import { CenteredSpinner } from '../atomic/CenteredSpinner';
import { Overlay } from '../atomic/Overlay';
import { Text } from '../atomic/Text';
import { OverlayProps } from 'react-native-elements';

interface ActivityIndicatorProps extends OverlayProps {
	color?: string;
	text?: string;
}

interface OverlayActivityIndicatorProps extends ActivityIndicatorProps {
	children?: React.ReactNode;
}

/**
 * Activity Indicator Component
 */
export function ActivityIndicator(props: ActivityIndicatorProps) {
	const { isVisible = true, ...rest } = props;

	if (!isVisible) {
		return null;
	}

	return <CenteredSpinner {...rest} />;
}

const StyledText = styled(Text)`
	color: ${props => props.theme?.colors?.tertiary};
`;

const Container = styled(View)`
	background-color: transparent;
	align-items: center;
	flex-direction: column;
`;

/**
 * Overlay Activity Indicator Component
 */
export function OverlayActivityIndicator({
	text,
	isVisible = true,
	children,
	color,
	...rest
}: OverlayActivityIndicatorProps) {
	return (
		<Overlay isVisible={isVisible} transparent {...rest}>
			<Container>
				<Progress.Circle
					size={50}
					borderWidth={5}
					indeterminate
					color={color}
				/>
				{text ? <StyledText>{text}</StyledText> : null}
				{children || null}
			</Container>
		</Overlay>
	);
}

export default ActivityIndicator;

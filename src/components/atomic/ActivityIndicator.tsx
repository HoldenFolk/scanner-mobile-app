import React from 'react';
import { View } from '@kaidu/shared/components/atomic/View';
import * as Progress from 'react-native-progress';
import { styled } from '@kaidu/shared/lib/styles';
import { CenteredSpinner } from '@kaidu/shared/components/molecule/CenteredSpinner';
import { tailwind } from '@kaidu/shared/lib/styles';
import { Overlay } from './Overlay';
import { Text } from './Text';

/**
 *
 */
export function ActivityIndicator(props) {
	const { animating = true, text, isVisible = true, children, ...rest } = props;

	if (!isVisible) {
		return null;
	}

	return <CenteredSpinner {...props} />;
}

const StyledText = styled(Text)`
	color: ${props => props?.theme?.colors?.tertiary};
`;

export default ActivityIndicator;

/**
 *
 */
export function OverlayActivityIndicator({ ...optionals }) {
	const {
		animating = true,
		text,
		isVisible = true,
		children,
		color,
		...rest
	} = optionals;

	return (
		<Overlay isVisible={isVisible} transparent {...rest}>
			<View style={tailwind('bg-transparent flex items-center')}>
				<Progress.Circle
					size={50}
					borderWidth={5}
					indeterminate
					color={color}
				/>
				{text ? <StyledText>{text}</StyledText> : null}
				{children || null}
			</View>
		</Overlay>
	);
}

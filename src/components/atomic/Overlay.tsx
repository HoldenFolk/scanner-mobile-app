import React from 'react';
import {
	Overlay as RNElementsOverlay,
	OverlayProps,
} from 'react-native-elements';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

interface RNEOverlayProps extends OverlayProps {
	isVisible: boolean;
}

export function Overlay({ isVisible, ...optionals }: RNEOverlayProps) {
	const { children, ...rest } = optionals;
	const theme = useTheme();

	const backdropStyle = {
		backgroundColor: theme?.colors?.grayscale[3],
		opacity: 0.9,
	};

	return (
		<StyledOverlay
			isVisible={isVisible}
			backdropStyle={backdropStyle}
			{...rest}
		>
			{children}
		</StyledOverlay>
	);
}

export default Overlay;

const StyledOverlay = styled(RNElementsOverlay).attrs(() => ({
	overlayStyle: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		shadowColor: 'transparent',
		elevation: 0,
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
}))``;

import React from 'react';
import { Overlay as RNElementsOverlay } from 'react-native-elements';
import { useTheme } from '@kaidu/shared/lib/styles';

/**
 *
 */
export function Overlay({ isVisible, ...optionals }) {
	const { children, ...rest } = optionals;
	const theme = useTheme();

	return (
		<RNElementsOverlay
			isVisible={isVisible}
			overlayStyle={{
				backgroundColor: 'transparent',
				borderWidth: 0,
				shadowColor: 'transparent',
				elevation: 0,
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			backdropStyle={{
				backgroundColor: theme?.colors?.grayscale[3],
				opacity: 0.9,
			}}
			{...rest}
		>
			{children}
		</RNElementsOverlay>
	);
}

export default Overlay;

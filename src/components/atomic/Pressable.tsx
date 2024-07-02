import React from 'react';
import {
	Platform,
	Pressable as NativePressable,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
} from 'react-native';

export function Pressable({ children, ...optionals }) {
	const { type, ...rest } = optionals;

	const defaultType = Platform.OS === 'android' ? 'nativeFeedback' : 'opacity';
	const finalType = type || defaultType;

	if (finalType === 'highlight') {
		return <TouchableHighlight {...rest}>{children}</TouchableHighlight>;
	}
	if (finalType === 'opacity') {
		return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
	}
	if (finalType === 'nativeFeedback') {
		return (
			<TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
		);
	}

	return <NativePressable {...optionals}>{children}</NativePressable>;
}

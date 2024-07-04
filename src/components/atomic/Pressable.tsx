import React from 'react';
import {
	Platform,
	Pressable as NativePressable,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	GestureResponderEvent,
	ViewStyle,
	StyleProp,
	TouchableHighlightProps,
	TouchableNativeFeedbackProps,
	TouchableOpacityProps,
	PressableProps as RNPressableProps,
} from 'react-native';

type CustomPressableProps =
	| (TouchableHighlightProps & { type: 'highlight' })
	| (TouchableOpacityProps & { type: 'opacity' })
	| (TouchableNativeFeedbackProps & { type: 'nativeFeedback' })
	| (RNPressableProps & { type?: undefined });

interface IPressableProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
}

export function Pressable({
	children,
	type,
	...rest
}: IPressableProps & CustomPressableProps) {
	const defaultType = Platform.OS === 'android' ? 'nativeFeedback' : 'opacity';
	const finalType = type || defaultType;

	if (finalType === 'highlight') {
		return (
			<TouchableHighlight {...(rest as TouchableHighlightProps)}>
				{children}
			</TouchableHighlight>
		);
	} else if (finalType === 'opacity') {
		return (
			<TouchableOpacity {...(rest as TouchableOpacityProps)}>
				{children}
			</TouchableOpacity>
		);
	} else if (finalType === 'nativeFeedback') {
		return (
			<TouchableNativeFeedback {...(rest as TouchableNativeFeedbackProps)}>
				{children}
			</TouchableNativeFeedback>
		);
	}

	return (
		<NativePressable {...(rest as RNPressableProps)}>
			{children}
		</NativePressable>
	);
}

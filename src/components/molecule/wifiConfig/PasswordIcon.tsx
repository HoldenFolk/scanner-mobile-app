import React from 'react';
import { Icon } from '../../atomic/Icon';
import {
	Pressable,
	CustomPressableProps,
	IPressableProps,
} from '../../atomic/Pressable';

// Define the prop types using an interface
interface PasswordIconProps {
	isHidden: boolean;
	onPress?: () => void;
	pressableProps?: IPressableProps & CustomPressableProps;
}

/**
 * A pressable icon for password
 */
export function PasswordIcon({
	isHidden,
	onPress,
	pressableProps,
}: PasswordIconProps) {
	const handlePress = () => {
		if (onPress) {
			onPress();
		}
	};

	return (
		<Pressable onPress={handlePress} {...pressableProps}>
			<Icon
				name={isHidden ? 'eye-slash' : 'eye'}
				size={24}
				type={'font-awesome'}
			/>
		</Pressable>
	);
}

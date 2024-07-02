/**
 * Icon names reference: https://oblador.github.io/react-native-vector-icons/
 * Github: https://github.com/oblador/react-native-vector-icons
 */
import React from 'react';
import { Icon as NativeIcon } from 'react-native-elements'; // https://reactnativeelements.com/docs/3.4.2/icon
import { withTheme, useTheme } from '@kaidu/shared/lib/styles';

function MyIcon({ theme, name, ...optionals }) {
	const { color = 'secondary', ...rest } = optionals;
	return (
		<NativeIcon color={theme?.colors[color] || color} name={name} {...rest} />
	);
}

export default withTheme(MyIcon);

/**
 * @props https://reactnativeelements.com/docs/3.4.2/icon#props
 */
export function Icon({
	name,
	...optionals
}: {
	name: string;
	[x: string]: any;
}) {
	const { color, ...rest } = optionals;
	const theme = useTheme();
	return (
		<NativeIcon
			color={color || theme?.colors?.secondary}
			name={name}
			{...rest}
		/>
	);
}

import React from 'react';
import { Icon as NativeIcon, IconProps } from '@rneui/base';
import { useTheme } from 'styled-components/native';

interface MyIconProps extends IconProps {
	name: string;
	color?: string;
}

const MyIcon: React.FC<MyIconProps> = ({
	name,
	color = 'secondary',
	...rest
}) => {
	const theme = useTheme();

	return (
		<NativeIcon color={theme?.colors[color] || color} name={name} {...rest} />
	);
};

export default MyIcon;

export const Icon: React.FC<MyIconProps> = ({ name, color, ...rest }) => {
	const theme = useTheme();

	return (
		<NativeIcon
			color={color || theme?.colors?.secondary}
			name={name}
			{...rest}
		/>
	);
};

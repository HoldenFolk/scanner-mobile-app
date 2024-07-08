import React from 'react';
import {
	StyleProp,
	TextStyle,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';
import { styled } from 'styled-components/native';
import { Text } from './Text';
import { scale, verticalScale } from 'react-native-size-matters';

interface ButtonProps extends TouchableOpacityProps {
	title?: string;
	type?: 'solid' | 'outline';
	titleStyle?: StyleProp<TextStyle>;
}

/**
 * use TouchableOpacity as base button
 */
export function Button(props: ButtonProps) {
	const {
		title,
		children,
		disabled = false,
		type = 'solid',
		style,
		titleStyle,
		...rest
	} = props;

	if (type === 'outline') {
		return (
			<Outlinebutton
				style={[{ padding: verticalScale(10), maxWidth: scale(280) }, style]}
				disabled={disabled}
				type={type}
				{...rest}
			>
				{title && <OutlineLabel>{title}</OutlineLabel>}
				{children}
			</Outlinebutton>
		);
	}

	return (
		<GeneralButton
			style={[{ padding: verticalScale(10), maxWidth: scale(280) }, style]}
			disabled={disabled}
			type={type}
			{...rest}
		>
			{title && <StyledLabel style={titleStyle}>{title}</StyledLabel>}
			{children}
		</GeneralButton>
	);
}

export default Button;

const GeneralButton = styled(TouchableOpacity)<{ type: string }>`
	background: ${props =>
		props?.type === 'success'
			? props?.theme?.colors?.success
			: props?.theme?.colors?.secondary};
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	width: 100%;
`;

const Outlinebutton = styled(GeneralButton)`
	background: transparent;
	border: 2px solid ${props => props.theme.colors.secondary};
`;

const StyledLabel = styled(Text)`
	color: ${props => props?.theme?.colors?.primary};
	font-size: 18px;
`;

const OutlineLabel = styled(StyledLabel)`
	color: ${props => props?.theme?.colors?.secondary};
`;

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from 'styled-components/native';
import { lighten } from 'polished';
import { scale, verticalScale } from '@kaidu/shared/lib/styles';
import { Text } from './Text';

const GeneralButton = styled(TouchableOpacity)`
	background: ${props =>
		props?.type === 'success'
			? props?.theme?.colors?.success
			: props?.theme?.colors?.secondary};
	align-items: center;
	justify-content: center;
	/* special styles */
	/* border: 2px solid ${props => props.theme.colors.fourth}; */
	border-radius: 8px;
	width: 100%;
`;

const Outlinebutton = styled(GeneralButton)`
	background: transparent;
	border: 2px solid ${props => props.theme.colors.secondary};
`;

const StyledLabel = styled(Text)`
	color: ${props =>
		props.lighter
			? lighten(0.6, props?.theme?.colors?.primary)
			: props?.theme?.colors?.primary};
	/* special styles */
	font-size: 18px;
`;

const OutlineLabel = styled(StyledLabel)`
	color: ${props => props?.theme?.colors?.secondary};
`;

/**
 * use TouchableOpacity as base button
 */
export function Button(props) {
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
				{...rest}
			>
				{title && <OutlineLabel lighter={disabled}>{title}</OutlineLabel>}
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
			{title && (
				<StyledLabel lighter={disabled} style={titleStyle}>
					{title}
				</StyledLabel>
			)}
			{children}
		</GeneralButton>
	);
}

export default Button;

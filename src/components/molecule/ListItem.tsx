import React from 'react';
import { ListItem, ListItemProps } from 'react-native-elements';
import styled from 'styled-components/native';
import { Pressable } from '../atomic/Pressable';
import { ViewStyle } from 'react-native';

const StyledListItem = styled(ListItem)<{ disabled?: boolean }>`
	background-color: ${props => props.theme.colors.primary};
	${({ disabled, theme }) =>
		disabled &&
		`
    color: ${theme.colors.tertiary};
    opacity: 0.6;
  `}
`;

const StyledContent = styled(ListItem.Content)`
	background-color: transparent;
`;

const contentContainerStyle: ViewStyle = {
	backgroundColor: 'transparent',
};

const StyledListTitle = styled(ListItem.Title)`
	color: ${({ theme }) => theme.colors.secondary};
`;

const StyledListSubtitle = styled(ListItem.Subtitle)`
	color: ${({ theme }) => theme.colors.fourth};
	font-size: 15px;
	margin-top: 8px;
`;

interface BasicListItemProps extends ListItemProps {
	disabled?: boolean;
	title?: string;
	subtitle?: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	titleProps?: object;
	subTitleStyle?: object;
	onPress?: () => void;
}

export const BasicListItem: React.FC<BasicListItemProps> = ({
	disabled = false,
	children,
	title,
	titleProps,
	onPress,
	leftComponent,
	rightComponent,
	subtitle,
	subTitleStyle,
	...rest
}) => {
	return (
		<Pressable onPress={onPress} disabled={disabled}>
			<StyledListItem
				containerStyle={contentContainerStyle}
				disabled={disabled}
				{...rest}
			>
				{leftComponent}
				<StyledContent>
					{title && <StyledListTitle {...titleProps}>{title}</StyledListTitle>}
					{subtitle && (
						<StyledListSubtitle style={subTitleStyle}>
							{subtitle}
						</StyledListSubtitle>
					)}
					{children}
				</StyledContent>
				{rightComponent}
			</StyledListItem>
		</Pressable>
	);
};

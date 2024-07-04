import React from 'react';
import { ListItem, ListItemProps } from 'react-native-elements';
import styled from 'styled-components/native';
import { Pressable } from '../atomic/Pressable';
import Icon from '../atomic/Icon';

const StyledListItem = styled(ListItem)<{ disabled?: boolean }>`
	background-color: ${({ theme }) => theme.colors.primary};
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

const StyledListTitle = styled(ListItem.Title)`
	color: ${({ theme }) => theme.colors.tertiary};
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
	containerStyle?: object;
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
	containerStyle,
	subtitle,
	subTitleStyle,
	...rest
}) => {
	return (
		<Pressable onPress={onPress} disabled={disabled}>
			<StyledListItem
				containerStyle={containerStyle}
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

interface ListItem2Props extends ListItemProps {
	disabled?: boolean;
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	isSelected?: boolean;
	titleStyle?: object;
	subtitleStyle?: object;
}

export const ListItem2: React.FC<ListItem2Props> = ({
	disabled = false,
	title,
	subtitle,
	children,
	isSelected = false,
	titleStyle,
	subtitleStyle,
	...rest
}) => {
	return (
		<StyledListItem {...rest} disabled={disabled}>
			{isSelected && <Icon name="check" />}
			<StyledContent>
				{title && <StyledListTitle style={titleStyle}>{title}</StyledListTitle>}
				{subtitle && (
					<StyledListSubtitle style={subtitleStyle}>
						{subtitle}
					</StyledListSubtitle>
				)}
				{children}
			</StyledContent>
		</StyledListItem>
	);
};

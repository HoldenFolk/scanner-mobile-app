// CustomDrawerContent.tsx
import React from 'react';
import {
	DrawerContentScrollView,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
	drawerContent: (props: DrawerContentComponentProps) => React.ReactNode;
}

const Container = styled(DrawerContentScrollView)`
	flex: 1;
	background-color: ${props => props.theme.colors.primary};
`;

const contentContainerStyle: ViewStyle = {
	flex: 1,
	justifyContent: 'space-between' as const,
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = props => {
	const { drawerContent, ...restProps } = props;

	return (
		<Container {...restProps} contentContainerStyle={contentContainerStyle}>
			{drawerContent(restProps)}
		</Container>
	);
};

export default CustomDrawerContent;

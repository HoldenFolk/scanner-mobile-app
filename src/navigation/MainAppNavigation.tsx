import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './DrawerNavigation';
import { DrawerItemGroup } from './Drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const DrawerContent = (props: DrawerContentComponentProps) => (
	<DrawerItemGroup {...props} />
);

function MainAppNavigation() {
	return (
		<NavigationContainer>
			<DrawerNavigation drawerContent={DrawerContent} />
		</NavigationContainer>
	);
}

export default MainAppNavigation;

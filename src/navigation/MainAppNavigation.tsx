import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerItemGroup } from './Drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';

const DrawerContent = (props: DrawerContentComponentProps) => (
	<DrawerItemGroup {...props} />
);

function MainAppNavigation() {
	return (
		<NavigationContainer>
			<StackNavigation drawerContent={DrawerContent} />
		</NavigationContainer>
	);
}

export default MainAppNavigation;

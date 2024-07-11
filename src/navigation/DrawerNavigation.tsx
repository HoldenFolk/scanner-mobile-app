import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DRAWER_SCREENS } from './routes';
import CustomDrawerContent from './Drawer/CustomDrawerContent';
import StackNavigation from './StackNavigation';

const Drawer = createDrawerNavigator();

interface DrawerNavigationProps {
	drawerContent: (props: DrawerContentComponentProps) => React.ReactNode;
}

export const DrawerNavigation: React.FC<DrawerNavigationProps> = ({
	drawerContent,
}) => {
	const renderDrawerContent = (props: DrawerContentComponentProps) => (
		<CustomDrawerContent {...props} drawerContent={drawerContent} />
	);

	// Side Drawer is always present in the application
	return (
		<Drawer.Navigator
			initialRouteName={DRAWER_SCREENS.INIT}
			drawerContent={renderDrawerContent}
		>
			<Drawer.Screen
				name={DRAWER_SCREENS.INIT}
				component={StackNavigation}
				options={{ headerShown: false, title: 'Home' }}
			/>
		</Drawer.Navigator>
	);
};

import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import CustomDrawerContent from './Drawer/CustomDrawerContent';
import StackNavigation from './StackNavigation';
import { STACK_SCREENS } from '@/types/navigation';

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
			initialRouteName={STACK_SCREENS.INIT}
			drawerContent={renderDrawerContent}
		>
			<Drawer.Screen
				name={STACK_SCREENS.INIT}
				component={StackNavigation}
				options={{ headerShown: false, title: 'Home' }}
			/>
		</Drawer.Navigator>
	);
};

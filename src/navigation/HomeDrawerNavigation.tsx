import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import CustomDrawerContent from './Drawer/CustomDrawerContent';
import { STACK_SCREENS } from '@/types/navigation';
import { Home } from '@/components/screens/Home';

const Drawer = createDrawerNavigator();

interface DrawerNavigationProps {
	drawerContent: (props: DrawerContentComponentProps) => React.ReactNode;
}

export const HomeDrawerNavigation: React.FC<DrawerNavigationProps> = ({
	drawerContent,
}) => {
	const renderDrawerContent = (props: DrawerContentComponentProps) => (
		<CustomDrawerContent {...props} drawerContent={drawerContent} />
	);

	// Side Drawer is always present in the application
	return (
		<Drawer.Navigator
			initialRouteName={STACK_SCREENS.DRAWER}
			drawerContent={renderDrawerContent}
		>
			<Drawer.Screen
				name={STACK_SCREENS.DRAWER}
				component={Home}
				options={{
					headerShown: false,
				}}
			/>
		</Drawer.Navigator>
	);
};

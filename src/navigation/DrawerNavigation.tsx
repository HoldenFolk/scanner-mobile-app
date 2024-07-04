// DrawerNavigation.tsx
import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
// import { StackNavigation } from './StackNavigation';
import { DRAWER_SCREENS } from './routes';
import CustomDrawerContent from './CustomDrawerContent';
import { Home } from '../components/screens/Home';

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

	return (
		<Drawer.Navigator
			initialRouteName={DRAWER_SCREENS.INIT}
			drawerContent={renderDrawerContent}
		>
			<Drawer.Screen
				name={DRAWER_SCREENS.INIT}
				component={Home}
				options={{ headerShown: false, title: 'Home' }}
			/>
		</Drawer.Navigator>
	);
};

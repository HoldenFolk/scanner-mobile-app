import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WifiConfigurationStackGroup } from './WifiConfigurationStackGroup';
import { STACK_SCREENS } from '@/types/navigation';
import { Setup } from '@/components/screens/Setup/SetupScreen';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HomeDrawerNavigation } from './HomeDrawerNavigation';

const Stack = createStackNavigator();

interface StackNavigationProps {
	drawerContent: (props: DrawerContentComponentProps) => React.ReactNode;
}

function StackNavigation({ drawerContent }: StackNavigationProps) {
	/**
	 * Main screens for application navigation
	 */
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={STACK_SCREENS.HOME}
				options={{
					headerShown: false,
				}}
			>
				{() => <HomeDrawerNavigation drawerContent={drawerContent} />}
			</Stack.Screen>
			<Stack.Screen
				name={STACK_SCREENS.WIFI_CONFIGURATION}
				component={WifiConfigurationStackGroup}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name={STACK_SCREENS.SETUP}
				component={Setup}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

export default StackNavigation;

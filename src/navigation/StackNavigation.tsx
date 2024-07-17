import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../components/screens/Home';
import { WifiConfigurationStackGroup } from './WifiConfigurationStackGroup';
import { STACK_SCREENS } from '@/types/navigation';
import { Setup } from '@/components/screens/Setup/SetupScreen';

const Stack = createStackNavigator();

function StackNavigation() {
	/**
	 * Main screens for application navigation
	 */
	return (
		<Stack.Navigator>
			<>
				<Stack.Group>
					<Stack.Screen
						name={STACK_SCREENS.HOME}
						component={Home}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={STACK_SCREENS.WIFI_CONFIGURATION}
						component={WifiConfigurationStackGroup}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={STACK_SCREENS.SETUP}
						component={Setup}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Group>
			</>
		</Stack.Navigator>
	);
}

export default StackNavigation;

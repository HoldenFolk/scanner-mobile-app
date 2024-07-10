import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../components/screens/Home';
import { WifiConfigurationStackGroup } from './WifiConfigurationStackGroup';
import { STACK_SCREENS } from './routes';

export const Stack = createStackNavigator();

export function StackNavigation() {
	/**
	 *
	 */
	// const handleReset = () => {
	// 	navigation.dispatch(resetToHome);
	// };

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
						name={STACK_SCREENS.WIFI.PARENT}
						component={WifiConfigurationStackGroup}
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

import React from 'react';
import { useTheme } from 'styled-components/native';
import { useForm, FormProvider } from 'react-hook-form';
import { createStackNavigator } from '@react-navigation/stack';

import { useColorScheme } from 'react-native';
import { STACK_SCREENS } from './routes';
import { Configuration } from '@/components/screens/configuration/Configuration';

const Stack = createStackNavigator();

/**
 * Wifi configuration screen and child modal screens
 */
export function WifiConfigurationStackGroup() {
	const theme = useTheme();
	const methods = useForm({
		defaultValues: {
			ssid: '',
			password: '',
			device_name: '',
			temp_wifi_ssid: '',
			temp_wifi_password: '',
		},
	});

	const isDarkMode = useColorScheme() === 'dark';

	const hideScreenTitleOptions = {
		headerShown: false,
		headerTransparent: true,
		headerTitle: '',
		headerTintColor: theme?.colors?.tertiary,
	};

	return (
		<FormProvider {...methods}>
			<Stack.Navigator
				initialRouteName={STACK_SCREENS.CONFIG}
				screenOptions={{
					cardStyle: {
						backgroundColor: isDarkMode
							? theme?.colors?.primary
							: theme?.colors.white,
					},
					headerStyle: {
						backgroundColor: isDarkMode
							? theme?.colors?.primary
							: theme?.colors.white,
					},
					headerTitleStyle: { color: theme?.colors?.tertiary },
				}}
			>
				<Stack.Group>
					<Stack.Screen
						name={STACK_SCREENS.CONFIG}
						component={Configuration}
						options={hideScreenTitleOptions}
					/>
				</Stack.Group>
				{/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
					<Stack.Screen
						name={STACK_SCREENS.WIFI.SELECTION}
						component={WifiSelectionModalScreen}
						options={{
							headerTitle: 'Wi-Fi',
							headerRight: props => (
								<RefreshWifiListBtn color={'secondary'} {...props} />
							),
						}}
					/>
					<Stack.Screen
						name={STACK_SCREENS.WIFI.PASSWORD}
						component={PasswordModalScreen}
						options={{
							headerTitle: 'Password',
						}}
					/>
					<Stack.Screen
						name={STACK_SCREENS.WIFI.OTHER}
						component={OtherModalScreen}
						options={{
							headerTitle: 'Other',
							headerBackTitle: 'Back',
						}}
					/>
				</Stack.Group> */}
			</Stack.Navigator>
		</FormProvider>
	);
}

import React from 'react';
import { useTheme } from 'styled-components/native';
import { useForm, FormProvider } from 'react-hook-form';
import { createStackNavigator } from '@react-navigation/stack';
import { Configuration } from '@/components/screens/Configuration/Configuration';
import { WifiSelectionModalScreen } from '@/components/screens/Configuration/WifiSelectionModalScreen';
import RefreshWifiListBtn from '@/components/molecule/wifiConfig/RefreshWifiListBtn';
import PasswordModalScreen from '@/components/screens/Configuration/PasswordModalScreen';
import { RootParamList, STACK_SCREENS } from '@/types/navigation';
import { GeolocationModalScreen } from '@/components/screens/Configuration/GeolocationModalScreen';

const Stack = createStackNavigator<RootParamList>();

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

	const isDarkMode = theme?.name === 'dark';

	const hideScreenTitleOptions = {
		headerShown: false,
		headerTransparent: true,
		headerTitle: '',
		headerTintColor: theme?.colors?.primary,
	};

	return (
		<FormProvider {...methods}>
			<Stack.Navigator
				initialRouteName={STACK_SCREENS.CONFIGURATION_SETTING}
				screenOptions={{
					cardStyle: {
						backgroundColor: isDarkMode
							? theme.colors.primary
							: theme.colors.white,
					},
					headerStyle: {
						backgroundColor: isDarkMode
							? theme.colors.secondary
							: theme.colors.white,
					},
					headerTitleStyle: { color: theme?.colors?.tertiary },
					headerTintColor: theme?.colors?.primary,
				}}
			>
				<Stack.Screen
					name={STACK_SCREENS.CONFIGURATION_SETTING}
					component={Configuration}
					options={hideScreenTitleOptions}
				/>
				<Stack.Screen
					name={STACK_SCREENS.WIFI_SELECTION_MODAL}
					component={WifiSelectionModalScreen}
					options={{
						headerTitle: 'Wi-Fi',
						headerRight: RefreshWifiListBtn,
					}}
				/>
				<Stack.Screen
					name={STACK_SCREENS.PASSWORD_MODAL}
					component={PasswordModalScreen}
					options={{
						headerTitle: 'Password',
					}}
				/>
				<Stack.Screen
					name={STACK_SCREENS.GEOLOCATION_MODAL}
					component={GeolocationModalScreen}
					options={{ headerTitle: 'Geolocation' }}
				/>
			</Stack.Navigator>
		</FormProvider>
	);
}

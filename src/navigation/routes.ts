import { RootParamList } from '@/types/navigation';
import { NavigationProp } from '@react-navigation/native';

export const routes = {
	Home: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('Home'),
	ConfigurationSetting: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('ConfigurationSetting'),
	Settings: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('Settings'),
	WifiConfiguration: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('WifiConfiguration'),
	WifiSelectionModal: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('WifiSelectionModal'),
	PasswordModal: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('PasswordModal'),
	OtherModal: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('OtherModal'),
	Init: (navigation: NavigationProp<RootParamList>) =>
		navigation.navigate('Init'),
};

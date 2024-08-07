import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '@/types/navigation';
import { NavigationProp } from '@react-navigation/native';

const useAppNavigation = () => {
	const navigation = useNavigation<NavigationProp<RootParamList>>();

	return {
		Home: () => navigation.navigate('Home'),
		Setup: () => navigation.navigate('Setup'),
		ConfigurationSetting: () => navigation.navigate('ConfigurationSetting'),
		Settings: () => navigation.navigate('Settings'),
		WifiConfiguration: () => navigation.navigate('WifiConfiguration'),
		WifiSelectionModal: () => navigation.navigate('WifiSelectionModal'),
		PasswordModal: () => navigation.navigate('PasswordModal'),
		GeolocationModal: () => navigation.navigate('GeolocationModal'),
		OtherModal: () => navigation.navigate('OtherModal'),
	};
};

export default useAppNavigation;

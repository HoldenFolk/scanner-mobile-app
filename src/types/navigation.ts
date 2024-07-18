export type RootParamList = {
	Home: undefined;
	Setup: undefined;
	ConfigurationSetting: undefined;
	Settings: undefined;
	WifiConfiguration: undefined;
	WifiSelectionModal: undefined;
	PasswordModal: undefined;
	OtherModal: undefined;
	GeolocationModal: undefined;
	Init: undefined;
};

export const STACK_SCREENS = {
	HOME: 'Home',
	SETUP: 'Setup',
	CONFIGURATION_SETTING: 'ConfigurationSetting',
	WIFI_CONFIGURATION: 'WifiConfiguration',
	WIFI_SELECTION_MODAL: 'WifiSelectionModal',
	PASSWORD_MODAL: 'PasswordModal',
	OTHER_MODAL: 'OtherModal',
	GEOLOCATION_MODAL: 'GeolocationModal',
	INIT: 'Init',
} as const;

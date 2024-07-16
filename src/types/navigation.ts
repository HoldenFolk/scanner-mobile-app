export type RootParamList = {
	Home: undefined;
	Setup: undefined;
	ConfigurationSetting: undefined;
	Settings: undefined;
	WifiConfiguration: undefined;
	WifiSelectionModal: undefined;
	PasswordModal: undefined;
	OtherModal: undefined;
	Init: undefined;
};

export const STACK_SCREENS = {
	HOME: 'Home',
	SETUP: 'Setup',
	CONFIGURATION_SETTING: 'ConfigurationSetting',
	SETTINGS: 'Settings',
	WIFI_CONFIGURATION: 'WifiConfiguration',
	WIFI_SELECTION_MODAL: 'WifiSelectionModal',
	PASSWORD_MODAL: 'PasswordModal',
	OTHER_MODAL: 'OtherModal',
	INIT: 'Init',
} as const;

// This type will now represent the keys of STACK_SCREENS as a union of string literals.
export type RootRoute = keyof typeof STACK_SCREENS;

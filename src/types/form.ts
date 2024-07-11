import { Control, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

type formType = 'wifi_ssid' | 'wifi_password';

export interface GetWifiFormInputs {
	wifi_ssid: string;
	wifi_password: string;
}

export interface FormProps {
	control: Control<GetWifiFormInputs>;
	setValue: UseFormSetValue<GetWifiFormInputs>;
	options: string[];
	name: formType;
	trigger: UseFormTrigger<GetWifiFormInputs>;
}

export interface WifiFormReturn {
	ssidForm: FormProps;
	passwordForm: FormProps;
	handleSubmit: () => void;
}

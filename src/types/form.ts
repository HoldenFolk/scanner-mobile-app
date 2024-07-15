import { Control, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

type formType = 'wifi_ssid' | 'wifi_password';
type formTypeAuto = 'wifi_password';

export interface GetWifiFormInputs {
	wifi_ssid: string;
	wifi_password: string;
}

export interface GetWifiFormInputsAuto {
	wifi_password: string;
}

export interface FormProps {
	control: Control<GetWifiFormInputs>;
	setValue: UseFormSetValue<GetWifiFormInputs>;
	options: string[];
	name: formType;
	trigger: UseFormTrigger<GetWifiFormInputs>;
}

export interface FormPropsAuto {
	control: Control<GetWifiFormInputsAuto>;
	setValue: UseFormSetValue<GetWifiFormInputsAuto>;
	options: string[];
	name: formTypeAuto;
	trigger: UseFormTrigger<GetWifiFormInputsAuto>;
}

export interface WifiFormReturn {
	ssidForm: FormProps;
	passwordForm: FormProps;
	handleSubmit: () => void;
}

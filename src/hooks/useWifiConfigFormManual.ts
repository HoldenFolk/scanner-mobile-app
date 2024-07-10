import {
	useForm,
	Control,
	UseFormSetValue,
	UseFormTrigger,
} from 'react-hook-form';
import { GetWifiFormInputs } from '@/types/form';

type formType = 'wifi_ssid' | 'wifi_password';
export const SSID_NAME: formType = 'wifi_ssid';
export const PASSWORD_NAME: formType = 'wifi_password';

interface WifiConfigurationFormTypeFirstProps {
	defaultValues?: object;
	onSubmit: () => void;
}

interface FormProps {
	control: Control<GetWifiFormInputs>;
	setValue: UseFormSetValue<GetWifiFormInputs>;
	options: string[];
	name: formType;
	trigger: UseFormTrigger<GetWifiFormInputs>;
}

export const useWifiConfigFormManual = ({
	defaultValues = {},
	onSubmit,
}: WifiConfigurationFormTypeFirstProps) => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputs>({ defaultValues });

	const handleConfirm = async (data: GetWifiFormInputs) => {
		onSubmit();
		console.log('Handle Confirm', data);
	};

	const ssidForm: FormProps = {
		control,
		setValue,
		options: ['option1', 'option2'], // replace with actual options
		name: SSID_NAME,
		trigger,
	};

	const passwordForm: FormProps = {
		control,
		setValue,
		options: ['option1', 'option2'], // replace with actual options
		name: PASSWORD_NAME,
		trigger,
	};

	return {
		handleSubmit: handleSubmit(handleConfirm),
		ssidForm,
		passwordForm,
		errors,
	};
};

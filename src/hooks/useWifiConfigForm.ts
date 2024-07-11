import { useForm } from 'react-hook-form';
import { FormProps, GetWifiFormInputs, WifiFormReturn } from '@/types/form';

type formType = 'wifi_ssid' | 'wifi_password';
export const SSID_NAME: formType = 'wifi_ssid';
export const PASSWORD_NAME: formType = 'wifi_password';

interface WifiConfigurationFormTypeFirstProps {
	defaultValues?: object;
	onSubmit: () => void;
}

export const useWifiConfigForm = ({
	defaultValues = {},
	onSubmit,
}: WifiConfigurationFormTypeFirstProps): WifiFormReturn => {
	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	};
};

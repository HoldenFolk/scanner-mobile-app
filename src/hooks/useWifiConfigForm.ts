import { useForm } from 'react-hook-form';
import { FormProps, GetWifiFormInputs, WifiFormReturn } from '@/types/form';
import { useDispatch } from 'react-redux';
import {
	setConnectedDeviceWifiPSWD,
	setConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';

type formType = 'wifi_ssid' | 'wifi_password';
const SSID_NAME: formType = 'wifi_ssid';
const PASSWORD_NAME: formType = 'wifi_password';

interface WifiConfigurationFormTypeFirstProps {
	defaultValues?: object;
	onNavigation: () => void;
}

export const useWifiConfigForm = ({
	defaultValues = {},
	onNavigation,
}: WifiConfigurationFormTypeFirstProps): WifiFormReturn => {
	const dispatch = useDispatch();

	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputs>({ defaultValues });

	const handleConfirm = async (data: GetWifiFormInputs) => {
		dispatch(setConnectedDeviceWifiSSID(data.wifi_ssid));
		dispatch(setConnectedDeviceWifiPSWD(data.wifi_password));
		onNavigation();
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

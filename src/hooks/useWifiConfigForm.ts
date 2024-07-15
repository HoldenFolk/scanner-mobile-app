import { useForm } from 'react-hook-form';
import { FormProps, GetWifiFormInputs, WifiFormReturn } from '@/types/form';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConnectedDeviceId,
	setConnectedDeviceWifiPSWD,
	setConnectedDeviceWifiSSID,
} from '@/providers/redux/slices';
import { useScannerConfigure } from './useScannerConfigure';

type formType = 'wifi_ssid' | 'wifi_password';
export const SSID_NAME: formType = 'wifi_ssid';
export const PASSWORD_NAME: formType = 'wifi_password';

interface WifiConfigurationFormTypeFirstProps {
	defaultValues?: object;
}

export const useWifiConfigForm = ({
	defaultValues = {},
}: WifiConfigurationFormTypeFirstProps): WifiFormReturn => {
	const dispatch = useDispatch();
	const connectedId = useSelector(getConnectedDeviceId);
	const { configureDeviceWifi } = useScannerConfigure();

	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputs>({ defaultValues });

	const handleConfirm = async (data: GetWifiFormInputs) => {
		console.log('Handle Confirm', data);
		dispatch(setConnectedDeviceWifiSSID(data.wifi_ssid));
		dispatch(setConnectedDeviceWifiPSWD(data.wifi_password));
		configureDeviceWifi(connectedId);
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

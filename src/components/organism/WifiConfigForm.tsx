import React from 'react';
import { useSelector } from 'react-redux';
import { getConnectedDeviceWifiList } from '@/providers/redux/slices';
import { WifiConfigFormAuto } from './WifiConfigFormAuto';
import { WifiConfigFormManual } from './WifiConfigFormManual';
import { useWifiConfigForm } from '@/hooks/useWifiConfigForm';

interface WifiConfigurationFormProps {
	onCancel: () => void;
	onSubmit: () => void;
	defaultValues?: object;
}

// Create form state and select manual or auto Wifi SSID entry
const WifiConfigForm = ({
	onSubmit,
	onCancel,
	defaultValues,
}: WifiConfigurationFormProps) => {
	const wifiList = useSelector(getConnectedDeviceWifiList);
	const form = useWifiConfigForm({
		defaultValues,
		onSubmit,
	});

	return (
		<>
			{wifiList.length > 0 && (
				<WifiConfigFormAuto onCancel={onCancel} form={form} />
			)}
			{wifiList.length === 0 && (
				<WifiConfigFormManual onCancel={onCancel} form={form} />
			)}
		</>
	);
};

export default WifiConfigForm;

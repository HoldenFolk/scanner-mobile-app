import React from 'react';
import { useSelector } from 'react-redux';
import { getConnectedDeviceWifiList } from '@/providers/redux/slices';
import { WifiConfigFormAuto } from './WifiConfigFormAuto';
import { WifiConfigFormManual } from './WifiConfigFormManual';
import { useWifiConfigForm } from '@/hooks/useWifiConfigForm';

interface WifiConfigurationFormProps {
	onCancel: () => void;
	onNavigation: () => void;
	onWifiSelect: () => void;
	defaultValues?: object;
}

// Create form state and select manual or auto Wifi SSID entry
const WifiConfigForm = ({
	onNavigation,
	onWifiSelect,
	onCancel,
	defaultValues,
}: WifiConfigurationFormProps) => {
	const wifiList = useSelector(getConnectedDeviceWifiList);
	const formManual = useWifiConfigForm({
		defaultValues,
		onNavigation,
	});

	return (
		<>
			{wifiList.length > 0 && (
				<WifiConfigFormAuto onCancel={onCancel} onWifiSelect={onWifiSelect} />
			)}
			{wifiList.length === 0 && (
				<WifiConfigFormManual onCancel={onCancel} form={formManual} />
			)}
		</>
	);
};

export default WifiConfigForm;

import React from 'react';
import { useSelector } from 'react-redux';
import { getIsConnecting, getDeviceById } from '@/providers/redux/slices';
import { ScannedItemUI } from '@/components/molecule/ScannedItemUI';
import { ScannerData } from '@/types/scannerData';

export const KaiduScannedItem = (scanner: ScannerData) => {
	const isDisabled = useSelector(getIsConnecting);
	const deviceData: ScannerData = useSelector(state =>
		getDeviceById(state, scanner.id),
	);

	/**
	 * prepare and execute device connection
	 */
	const handlePress = () => {
		console.log('Connecting to device');
		console.log('navigate to config screen');
	};

	return (
		<ScannedItemUI
			macAddress={scanner.id}
			onPress={handlePress}
			disabled={isDisabled}
			data={deviceData}
		/>
	);
};

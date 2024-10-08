import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsConnecting, setScanning } from '@/providers/redux/slices';
import { ScannedItemUI } from '@/components/molecule/scannerItem/ScannedItemUI';
import { PlugState, ScannerData } from '@/types/scannerData';
import useAppNavigation from '@/hooks/useAppNavigation';

interface KaiduScannedItemProps {
	scanner: ScannerData;
	connectToScanner: (
		id: string,
		macAddress: string,
		plugState: PlugState,
	) => Promise<boolean>;
}

export const KaiduScannedItem = ({
	scanner,
	connectToScanner,
}: KaiduScannedItemProps) => {
	const isDisabled = useSelector(getIsConnecting);
	const dispatch = useDispatch();
	const { WifiConfiguration } = useAppNavigation();

	/**
	 * prepare and execute device connection
	 */
	const handlePress = async () => {
		dispatch(setScanning(false));
		try {
			const connected = await connectToScanner(
				scanner.id,
				scanner.macAddress,
				scanner.plugState,
			);
			if (connected) {
				WifiConfiguration();
			} else {
				throw new Error(
					'Make sure you are in range of the scanner and try again',
				);
			}
		} catch (error: unknown) {
			console.error('Error connecting to scanner:', error);
		}
	};

	return (
		<ScannedItemUI
			macAddress={scanner.macAddress}
			onPress={handlePress}
			disabled={isDisabled}
			data={scanner}
		/>
	);
};

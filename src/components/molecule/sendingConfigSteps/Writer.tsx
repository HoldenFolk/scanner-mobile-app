import { Heading } from '@/components/atomic/Heading';
import { View } from '@/components/atomic/View';
import { useScannerConfigure } from '@/hooks/useScannerConfigure';
import React from 'react';

interface WriterProps {
	bleId: string;
	macAddress: string;
	onFulfilled: () => void;
	onRejected: (err: Error) => Promise<void>;
	shouldStart: boolean;
}

export const Writer = ({
	bleId,
	macAddress,
	onFulfilled,
	onRejected,
	shouldStart,
}: WriterProps) => {
	const { configureDeviceWifi, configureDeviceGeolocation } =
		useScannerConfigure();

	const writeConfigToScanner = async () => {
		try {
			await configureDeviceWifi(bleId);
			await configureDeviceGeolocation(macAddress);
			onFulfilled();
		} catch (error) {
			await onRejected(error as Error);
		}
	};

	if (shouldStart) {
		console.log('Starting to write config to scanner');
		writeConfigToScanner();
	}

	return (
		<View>
			<Heading>
				Storing your WiFi settings. Remain near your Kaidu scanner until the
				operation finishes.
			</Heading>
		</View>
	);
};

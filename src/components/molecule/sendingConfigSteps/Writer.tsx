import { Heading } from '@/components/atomic/Heading';
import { View } from '@/components/atomic/View';
import { useScannerConfigure } from '@/hooks/useScannerConfigure';
import React from 'react';

interface WriterProps {
	bleId: string;
	onFulfilled: () => void;
	onRejected: (err: Error) => Promise<void>;
	shouldStart: boolean;
}

export const Writer = ({
	bleId,
	onFulfilled,
	onRejected,
	shouldStart,
}: WriterProps) => {
	const { configureDeviceWifi, configureDeviceGeolocation } =
		useScannerConfigure();

	const writeConfigToScanner = async () => {
		try {
			await configureDeviceWifi(bleId);
			await configureDeviceGeolocation(bleId);
			onFulfilled();
		} catch (error) {
			onRejected(error as Error);
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

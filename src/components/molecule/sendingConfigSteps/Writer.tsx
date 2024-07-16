import { Heading } from '@/components/atomic/Heading';
import { View } from '@/components/atomic/View';
import { useScannerConfigure } from '@/hooks/useScannerConfigure';
import React from 'react';

interface WriterProps {
	bleId: string;
	onFullfilled: () => void;
	onRejected: () => void;
	shouldStart: boolean;
}

const Writer = ({
	bleId,
	onFullfilled,
	onRejected,
	shouldStart,
}: WriterProps) => {
	const { configureDeviceWifi } = useScannerConfigure();

	const writeConfigToScanner = async () => {
		try {
			await configureDeviceWifi(bleId);
			onFullfilled();
		} catch (error) {
			onRejected();
		}
	};

	if (shouldStart) {
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
export default Writer;

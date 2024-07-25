import React from 'react';
import View from '@/components/atomic/View';
import { Heading } from '@/components/atomic/Heading';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';

interface VerifierProps {
	bleId: string;
	onFulfilled: () => Promise<void>;
	onRejected: (err: Error) => Promise<void>;
	startPolling: boolean;
}

export const Verifier = ({
	bleId,
	onFulfilled,
	onRejected,
	startPolling,
}: VerifierProps) => {
	const { isScannerConnected } = useBluetoothConnect();

	const startVerify = async () => {
		try {
			const isConnected = await isScannerConnected(bleId);
			console.log('Verifier ~ isConnected:', isConnected);
			if (isConnected) {
				await onFulfilled();
			} else if (startPolling && !isConnected) {
				await onRejected(new Error('Failed to disconnect BLE device'));
			}
		} catch (error) {
			await onRejected(error as Error);
		}
	};

	if (startPolling) {
		startVerify();
	}

	return (
		<View>
			<Heading>Verifying</Heading>
		</View>
	);
};

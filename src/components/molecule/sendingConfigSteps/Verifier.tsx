import React, { useEffect } from 'react';
import View from '@/components/atomic/View';
import { Heading } from '@/components/atomic/Heading';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';

interface VerifierProps {
	bleId: string;
	onFulfilled: () => void;
	onRejected: (err: Error) => Promise<void>;
	startPolling: boolean;
}

// TODO: Implement this component to validate that data has been sent and updated on the server
export const Verifier = ({
	bleId,
	onFulfilled,
	onRejected,
	startPolling,
}: VerifierProps) => {
	const { disconnectFromScanner, isScannerConnected } = useBluetoothConnect();

	useEffect(() => {
		const startVerify = async () => {
			const isConnected = await isScannerConnected(bleId);
			console.log('Verifier ~ isConnected:', isConnected);
			if (startPolling && isConnected) onFulfilled();
			else onRejected(new Error('Failed to disconnect BLE device'));
		};

		startVerify();
	}, [
		bleId,
		disconnectFromScanner,
		isScannerConnected,
		onFulfilled,
		onRejected,
		startPolling,
	]);
	return (
		<View>
			<Heading>Verifying</Heading>
		</View>
	);
};

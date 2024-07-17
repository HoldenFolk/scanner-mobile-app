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

export const Verifier = ({
	bleId,
	onFulfilled,
	onRejected,
	startPolling,
}: VerifierProps) => {
	const { disconnectFromScanner } = useBluetoothConnect();

	useEffect(() => {
		const startVerify = async () => {
			const isDisconnected = await disconnectFromScanner(bleId);
			if (startPolling && isDisconnected) onFulfilled();
			else onRejected(new Error('Failed to disconnect BLE device'));
		};

		startVerify();
	}, [bleId, disconnectFromScanner, onFulfilled, onRejected, startPolling]);
	return (
		<View>
			<Heading>Verifying</Heading>
		</View>
	);
};

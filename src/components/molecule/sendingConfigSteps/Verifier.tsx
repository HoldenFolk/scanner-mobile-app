import React, { useEffect, useCallback } from 'react';
import View from '@/components/atomic/View';
import { Heading } from '@/components/atomic/Heading';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';

interface VerifierProps {
	bleId: string;
	onFulfilled: () => Promise<void>;
	onRejected: (err: Error) => Promise<void>;
	startPolling: boolean;
}

export const Verifier: React.FC<VerifierProps> = ({
	bleId,
	onFulfilled,
	onRejected,
	startPolling,
}) => {
	const { isScannerConnected } = useBluetoothConnect();

	const startVerify = useCallback(async () => {
		try {
			const isConnected = await isScannerConnected(bleId);
			if (isConnected) {
				await onFulfilled();
			} else if (startPolling && !isConnected) {
				await onRejected(new Error('Failed to disconnect BLE device'));
			}
		} catch (error) {
			await onRejected(error as Error);
		}
	}, [bleId, isScannerConnected, onFulfilled, onRejected, startPolling]);

	useEffect(() => {
		if (startPolling) {
			startVerify();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View>
			<Heading>Verifying</Heading>
		</View>
	);
};

import { Text } from '@/components/atomic/Text';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import React from 'react';

export const Home: React.FC = () => {
	const { devices, scanning } = useBluetoothScan();
	console.log('Scanning Status:', scanning.toString());

	return (
		<BasicTemplate>
			<Text>
				Status: {scanning} Devices: {devices.toString()}
			</Text>
		</BasicTemplate>
	);
};

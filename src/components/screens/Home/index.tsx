import { Text } from '@/components/atomic/Text';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import { useBluetoothScan } from '@/hooks/useBlutoothScan';
import React from 'react';

export const Home: React.FC = () => {
	const { devices } = useBluetoothScan();

	return (
		<BasicTemplate>
			<Text>Devices: {devices.toString()}</Text>
		</BasicTemplate>
	);
};

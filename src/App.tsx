import React from 'react';
import 'react-native-gesture-handler';
import Theme from './providers/Theme';
import { BasicTemplate } from './components/template/BasicTemplate/BasicTemplate';
import { Text } from './components/atomic/Text';
import { useBluetoothScan } from './hooks/useBlutoothScan';

function App() {
	const { devices, scanning } = useBluetoothScan();
	console.log('Devices Found: ', devices);
	console.log('Scanning Status:', scanning.toString());

	return (
		<Theme>
			<BasicTemplate>
				<Text>
					Status: {scanning} Devices: {devices.toString()}
				</Text>
			</BasicTemplate>
		</Theme>
	);
}

export default App;

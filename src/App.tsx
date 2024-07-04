import React from 'react';
import 'react-native-gesture-handler';
import Theme from './providers/Theme';
import { useBluetoothScan } from './hooks/useBlutoothScan';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './navigation/DrawerNavigation';
import { DrawerItemGroup } from './navigation/Drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

function App() {
	const { devices, scanning } = useBluetoothScan();
	console.log('Scanning Status:', scanning.toString());

	return (
		<Theme>
			<NavigationContainer>
				<DrawerNavigation
					// eslint-disable-next-line react/no-unstable-nested-components
					drawerContent={(props: DrawerContentComponentProps) => (
						<DrawerItemGroup {...props} />
					)}
				/>
			</NavigationContainer>
		</Theme>
	);
}

export default App;

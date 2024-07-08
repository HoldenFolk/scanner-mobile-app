import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../atomic/Button';
import { View } from '../atomic/View';
import { useTheme } from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsScanning, setScanning } from '@/providers/redux/slices';

/**
 * A button to stop BLE scanning
 */
export function BleScanButton({ ...optionals }) {
	const theme = useTheme();
	const isScanning = useSelector(getIsScanning);
	const dispatch = useDispatch();

	const title = isScanning ? 'Stop Scan' : 'Start Scan';

	// Change the global scanning status which will trigger the useBluetoothScan effect
	const handlePress = () => {
		const changeScan = !isScanning;
		dispatch(setScanning(changeScan));
	};

	return (
		<View style={styles.container}>
			<Button
				{...optionals}
				title={title}
				// size="small"
				onPress={handlePress}
				titleStyle={{ color: theme.colors.white }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		zIndex: 65535,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

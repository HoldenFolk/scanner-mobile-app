import React from 'react';
import { Icon } from '../atomic/Icon';
import { useTheme } from 'styled-components/native';
import { cond, always, lte, T } from 'ramda';

export const getsScannerNetworkRSSIIcon = cond([
	[lte(-50), always({ type: 'material-community', name: 'wifi-strength-4' })],
	[lte(-70), always({ type: 'material-community', name: 'wifi-strength-3' })],
	[lte(-80), always({ type: 'material-community', name: 'wifi-strength-2' })],
	[lte(-90), always({ type: 'material-community', name: 'wifi-strength-1' })],
	[T, always(null)],
]);

/**
 *
 */
interface RSSIStrengthIconProps {
	value: number;
	style?: React.CSSProperties; // Optional style prop
}

export function RSSIStrengthIcon({ value, style = {} }: RSSIStrengthIconProps) {
	// Hooks
	const theme = useTheme();

	const scannerNetworkRSSIIcon = getsScannerNetworkRSSIIcon(value);
	if (!scannerNetworkRSSIIcon) {
		return null;
	}

	return (
		<Icon
			{...scannerNetworkRSSIIcon}
			style={[{ marginLeft: 12 }, style]}
			color={theme?.colors?.fourth}
		/>
	);
}

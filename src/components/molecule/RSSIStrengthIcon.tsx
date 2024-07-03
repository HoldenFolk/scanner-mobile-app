import React from 'react';
// import { styled } from '@kaidu/shared/lib/styles';
import { Icon } from '../atomic/Icon';
import { tailwind, useTheme } from '@kaidu/shared/lib/styles';
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
export function RSSIStrengthIcon({ value, ...optionals }) {
  const {style, ...rest} = optionals;
  // Hooks
  const theme = useTheme();

  
  const scannerNetworkRSSIIcon = getsScannerNetworkRSSIIcon(value);
  if (!scannerNetworkRSSIIcon) {
    return null;
  }

  return (
    <Icon
      {...scannerNetworkRSSIIcon}
      style={[tailwind('ml-3'), style]}
      color={theme?.colors?.fourth}
    />
  );
}

import React from 'react';
import styled from 'styled-components/native';
import { View } from '../../atomic/View';
import { Text as AtomicText } from '../../atomic/Text';

/**
 * Text information about Wi-Fi requirements
 */
export function WifiRequirementInfo() {
	return (
		<View>
			<StyledText>Select 2.4 GHz Wi-Fi Network</StyledText>
		</View>
	);
}

const StyledText = styled(AtomicText)`
	font-size: 18px; /* Equivalent to text-lg */
	color: ${props => props.theme.colors.warn};
`;

import React from 'react';
import styled from 'styled-components/native';
import View from '@/components/atomic/View';
import { Text } from '@/components/atomic/Text';
import { PlugState } from '@/types/scannerData';
import { PlugStateIcon } from '../PlugStateIcon';

function getTextByPlugState(plugState: PlugState): string {
	let text;
	switch (plugState) {
		case PlugState.UNCONFIGURED:
			text = 'Unconfigured';
			break;
		case PlugState.CONFIGURED:
			text = 'Configured';
			break;
		case PlugState.CONNECTED:
			text = 'Online';
			break;
		case PlugState.WIFI_DISCONNECTED:
			text = 'Connecting to WiFi';
			break;
		case PlugState.MQTT_DISCONNECTED:
			text = 'WiFi Connected, Not Online';
			break;
		case PlugState.WIFI_SSID_NOT_FOUND:
			text = 'WiFi Not Seen by Scanner';
			break;
		default:
			text = 'Unknown State or crashed';
			break;
	}
	return text;
}

/**
 * Display Plug state information in a section
 */
export function PlugStateInfo({ plugState }: { plugState: PlugState }) {
	const text = getTextByPlugState(plugState);

	return (
		<Container>
			<StyledPlugStateIcon type={plugState} />
			<StyledText>{text}</StyledText>
		</Container>
	);
}

const Container = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 4px;
	width: 100%;
`;

const StyledPlugStateIcon = styled(PlugStateIcon)`
	margin-right: 12px;
`;

const StyledText = styled(Text)`
	font-size: 20px;
	text-align: justify;
`;

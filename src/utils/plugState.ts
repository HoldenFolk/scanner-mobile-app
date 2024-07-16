import { PlugState } from '@/types/scannerData';

/**
 * @returns true if it is configured but not connected
 */
export function checkIsConnectionError(plugState: PlugState) {
	return (
		plugState === PlugState.WIFI_DISCONNECTED ||
		plugState === PlugState.MQTT_DISCONNECTED ||
		plugState === PlugState.WIFI_SSID_NOT_FOUND
	);
}

export function getValidPlugState(value: string): PlugState {
	if (value && Object.values(PlugState).includes(value as PlugState)) {
		return value as PlugState;
	}
	return PlugState.UNCONFIGURED; // Default value
}

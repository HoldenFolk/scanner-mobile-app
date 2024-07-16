import { AdvertisingPayload } from './bleManagerTypes';

export interface ScannerData {
	id: string;
	name?: string;
	rssi: number;
	wifiRssi: number;
	advertising: AdvertisingPayload;
	plugState: PlugState;
	kaiduDeviceType: 'wifi' | 'lte';
}

export enum PlugState {
	UNCONFIGURED = 'f0',
	CONFIGURED = 'f1',
	CONNECTED = 'f2',
	WIFI_DISCONNECTED = 'e1',
	MQTT_DISCONNECTED = 'e2',
	WIFI_SSID_NOT_FOUND = 'e0',
}

export interface Wifi {
	ssid: string;
	rssi: string;
}

export enum AsyncLifecycle {
	IDLE = 'idle',
	PENDING = 'pending', //aka writing
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
	CANCELLED = 'cancelled',
	VERIFYING = 'verifying',
}

export interface ManufacturerData {
	mac: string;
	plugState: string;
	rssi?: string | number;
}

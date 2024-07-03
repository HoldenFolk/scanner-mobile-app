export interface Peripheral {
	id: string;
	name: string | null;
	rssi: number;
	advertising: AdvertisingPayload;
}

export interface AdvertisingPayload {
	isConnectable: boolean;
	serviceUuids: string[];
	manufacturerData: JSON;
	serviceData: JSON;
	txPowerLevel: number;
	localName: string;
	rawData?: JSON;
}

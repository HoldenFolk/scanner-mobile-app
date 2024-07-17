export interface Peripheral {
	id: string;
	name: string | null;
	rssi: number;
	advertising: AdvertisingPayload;
	// serviceData: any;
	// serviceUUIDs: string[];
	// txPowerLevel: number;
}

export interface AdvertisingPayload {
	isConnectable: boolean;
	serviceUuids: string[];
	manufacturerData: ManufacturerDataRaw;
	serviceData: JSON;
	txPowerLevel: number;
	localName: string;
	rawData?: JSON;
}

export interface ManufacturerDataRaw {
	CDVType: string;
	ffff: { bytes: number[] };
	data: string;
}

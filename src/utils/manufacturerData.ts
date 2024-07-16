import { Buffer } from 'buffer';

export const decodeManufacturerData = (bytes: number[]) => {
	const macAddressBytes = bytes.slice(0, 6);
	const plugStateBytes = bytes.slice(6, 7);
	const rssi = bytes.slice(7, 8);

	const manufacturerData = {
		macAddress: formatMacAddress(convertBytesToString(macAddressBytes)),
		plugState: convertBytesToString(plugStateBytes),
		rssi: parseInt(convertBytesToString(rssi), 16),
	};
	return manufacturerData;
};

export const convertBytesToString = (bytes: number[]) => {
	const buffer = Buffer.from(bytes);
	return buffer.toString('hex');
};

const formatMacAddress = (macAddress: string) => {
	const macAddressArray = macAddress.match(/.{1,2}/g);
	const formattedMacAddress = macAddressArray?.join(':').toUpperCase();
	return formattedMacAddress || '';
};

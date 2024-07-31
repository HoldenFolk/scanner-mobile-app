import { ScannerData } from '@/types/scannerData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'ramda';
import { AppState } from '@/types/redux';

interface ScannerDevicesState {
	devices: ScannerData[];
}

const initialState: ScannerDevicesState = {
	devices: [],
};

export const scannerDevicesSlice = createSlice({
	name: 'scannerDevices',
	initialState,
	reducers: {
		addDevice: (state, action: PayloadAction<ScannerData>) => {
			const index = state.devices.findIndex(
				device => device.macAddress === action.payload.macAddress,
			);
			if (index !== -1) {
				state.devices[index] = action.payload;
			} else {
				state.devices.push(action.payload);
			}
		},
		removeDevice: (state, action: PayloadAction<string>) => {
			state.devices = remove(
				state.devices.findIndex(device => device.id === action.payload),
				1,
				state.devices,
			);
		},
		clearDevices: state => {
			state.devices = [];
		},
	},
});

// Selectors
export const getDevices = (state: AppState): ScannerData[] =>
	state.scannerDevices.devices;
export const getDeviceById = (state: AppState, id: string): ScannerData =>
	state.scannerDevices.devices.find((device: ScannerData) => device.id === id);

export const { addDevice, removeDevice, clearDevices } =
	scannerDevicesSlice.actions;
export default scannerDevicesSlice.reducer;

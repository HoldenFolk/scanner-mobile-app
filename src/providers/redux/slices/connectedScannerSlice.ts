import { AppState } from '@/types/redux';
import { Wifi } from '@/types/scannerData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectedScannerState {
	bleID: string;
	wifiSSID?: string;
	wifiPSWD?: string;
	isConfigured: boolean;
	wifiList: Wifi[];
	pending: {
		isLoadingWifiList: boolean;
	};
}

const initialState: ConnectedScannerState = {
	bleID: '',
	wifiSSID: '',
	wifiPSWD: '',
	isConfigured: false,
	wifiList: [],
	pending: {
		isLoadingWifiList: false,
	},
};

export const connectedScannerSlice = createSlice({
	name: 'connectedScanner',
	initialState,
	reducers: {
		setConnectedDeviceId: (state, action: PayloadAction<string>) => {
			state.bleID = action.payload;
		},
		setConnectedDeviceWifiSSID: (state, action: PayloadAction<string>) => {
			state.wifiSSID = action.payload;
		},
		setConnectedDeviceWifiPSWD: (state, action: PayloadAction<string>) => {
			state.wifiPSWD = action.payload;
		},
		setConnectedDeviceIsConfigured: (state, action: PayloadAction<boolean>) => {
			state.isConfigured = action.payload;
		},
		setConnectedDeviceWifiList: (state, action: PayloadAction<Wifi[]>) => {
			state.wifiList = action.payload;
		},
		resetConnectedScanner: state => {
			state.bleID = '';
			state.wifiSSID = '';
			state.wifiPSWD = '';
			state.isConfigured = false;
			state.wifiList = [];
		},
	},
});

// Selectors
export const getConnectedDeviceId = (state: AppState): string =>
	state.connectedScanner.bleID;
export const getConnectedDeviceWifiSSID = (
	state: AppState,
): string | undefined => state.connectedScanner.wifiSSID;
export const getConnectedDeviceWifiPSWD = (
	state: AppState,
): string | undefined => state.connectedScanner.wifiPSWD;
export const getConnectedDeviceIsConfigured = (state: AppState): boolean =>
	state.connectedScanner.isConfigured;
export const getConnectedDeviceWifiList = (state: AppState): Wifi[] =>
	state.connectedScanner.wifiList;

export const {
	setConnectedDeviceId,
	setConnectedDeviceWifiSSID,
	setConnectedDeviceWifiPSWD,
	setConnectedDeviceIsConfigured,
	setConnectedDeviceWifiList,
	resetConnectedScanner,
} = connectedScannerSlice.actions;
export default connectedScannerSlice.reducer;

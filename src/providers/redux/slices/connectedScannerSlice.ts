import { Geolocation } from '@/types/api';
import { AppState } from '@/types/redux';
import { PlugState, Wifi } from '@/types/scannerData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// bleID is the unique identifier for the scanner in IOS. In android, it is the same as the mac address
interface ConnectedScannerState {
	bleID: string;
	macAddress: string;
	name: string;
	wifiSSID?: string;
	wifiPSWD?: string;
	isConfigured: boolean;
	plugState: PlugState;
	wifiList: Wifi[];
	geolocation?: Geolocation;
}

const initialState: ConnectedScannerState = {
	bleID: '',
	macAddress: '',
	name: '',
	wifiSSID: undefined,
	wifiPSWD: undefined,
	isConfigured: false,
	plugState: PlugState.UNCONFIGURED,
	wifiList: [],
};

export const connectedScannerSlice = createSlice({
	name: 'connectedScanner',
	initialState,
	reducers: {
		setConnectedDeviceId: (state, action: PayloadAction<string>) => {
			state.bleID = action.payload;
		},
		setConnectedDeviceMacAddress: (state, action: PayloadAction<string>) => {
			state.macAddress = action.payload;
		},
		setConnectedDeviceName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setConnectedDeviceWifiSSID: (
			state,
			action: PayloadAction<string | undefined>,
		) => {
			state.wifiSSID = action.payload;
		},
		setConnectedDeviceWifiPSWD: (
			state,
			action: PayloadAction<string | undefined>,
		) => {
			state.wifiPSWD = action.payload;
		},
		setConnectedDeviceIsConfigured: (state, action: PayloadAction<boolean>) => {
			state.isConfigured = action.payload;
		},
		setConnectedDeviceWifiList: (state, action: PayloadAction<Wifi[]>) => {
			state.wifiList = action.payload;
		},
		setConnectedDevicePlugState: (state, action: PayloadAction<PlugState>) => {
			state.plugState = action.payload;
		},
		setConnectedDeviceGeolocation: (
			state,
			action: PayloadAction<Geolocation>,
		) => {
			state.geolocation = action.payload;
		},
		resetConnectedScanner: state => {
			state.bleID = '';
			state.macAddress = '';
			state.name = '';
			state.wifiSSID = undefined;
			state.wifiPSWD = undefined;
			state.isConfigured = false;
			state.wifiList = [];
			state.plugState = PlugState.UNCONFIGURED;
			state.geolocation = undefined;
		},
	},
});

// Selectors
export const getConnectedDeviceId = (state: AppState): string =>
	state.connectedScanner.bleID;
export const getConnectedDeviceMacAddress = (state: AppState): string =>
	state.connectedScanner.macAddress;
export const getConnectedDeviceName = (state: AppState): string =>
	state.connectedScanner.name;
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
export const getConnectedDevicePlugState = (state: AppState): PlugState =>
	state.connectedScanner.plugState;
export const getConnectedDeviceGeolocation = (
	state: AppState,
): Geolocation | undefined => state.connectedScanner.geolocation;

export const {
	setConnectedDeviceId,
	setConnectedDeviceName,
	setConnectedDeviceWifiSSID,
	setConnectedDeviceWifiPSWD,
	setConnectedDeviceIsConfigured,
	setConnectedDeviceWifiList,
	setConnectedDevicePlugState,
	setConnectedDeviceGeolocation,
	setConnectedDeviceMacAddress,
	resetConnectedScanner,
} = connectedScannerSlice.actions;
export default connectedScannerSlice.reducer;

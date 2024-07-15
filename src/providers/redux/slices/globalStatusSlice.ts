import { AppState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalStatusState {
	isScanning: boolean;
	isConnecting: boolean;
	isConnected: boolean;
	isLoadingWifiList: boolean;
}

const initialState: GlobalStatusState = {
	isScanning: false,
	isConnecting: false,
	isConnected: false,
	isLoadingWifiList: false,
};

export const globalStatusSlice = createSlice({
	name: 'globalStatus',
	initialState,
	reducers: {
		setScanning: (state, action: PayloadAction<boolean>) => {
			state.isScanning = action.payload;
		},
		setConnecting: (state, action: PayloadAction<boolean>) => {
			state.isConnecting = action.payload;
		},
		setConnected: (state, action: PayloadAction<boolean>) => {
			state.isConnected = action.payload;
		},
		setLoadingWifiList: (state, action: PayloadAction<boolean>) => {
			state.isLoadingWifiList = action.payload;
		},
	},
});

// Selectors
export const getIsScanning = (state: AppState): boolean =>
	state.globalStatus.isScanning;
export const getIsConnecting = (state: AppState): boolean =>
	state.globalStatus.isConnecting;
export const getIsConnected = (state: AppState): boolean =>
	state.globalStatus.isConnected;
export const getIsLoadingWifiList = (state: AppState): boolean =>
	state.globalStatus.isLoadingWifiList;

export const { setScanning, setConnecting, setConnected, setLoadingWifiList } =
	globalStatusSlice.actions;
export default globalStatusSlice.reducer;

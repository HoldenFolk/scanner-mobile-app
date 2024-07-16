import { AppState } from '@/types/redux';
import { AsyncLifecycle } from '@/types/scannerData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalStatusState {
	isScanning: boolean;
	isConnecting: boolean;
	isConnected: boolean;
	isLoadingWifiList: boolean;
	configState: AsyncLifecycle;
}

const initialState: GlobalStatusState = {
	isScanning: false,
	isConnecting: false,
	isConnected: false,
	isLoadingWifiList: false,
	configState: AsyncLifecycle.IDLE,
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
		setConfigState: (state, action: PayloadAction<AsyncLifecycle>) => {
			state.configState = action.payload;
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
export const getConfigState = (state: AppState): AsyncLifecycle =>
	state.globalStatus.configState;

export const {
	setScanning,
	setConnecting,
	setConnected,
	setLoadingWifiList,
	setConfigState,
} = globalStatusSlice.actions;
export default globalStatusSlice.reducer;

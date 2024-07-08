import { AppState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isScanning: true,
	isConnecting: false,
	isConnected: false,
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
	},
});

// Selectors
export const getIsScanning = (state: AppState) => state.globalStatus.isScanning;
export const getIsConnecting = (state: AppState) =>
	state.globalStatus.isConnecting;
export const getIsConnected = (state: AppState) =>
	state.globalStatus.isConnected;

export const { setScanning, setConnecting, setConnected } =
	globalStatusSlice.actions;
export default globalStatusSlice.reducer;

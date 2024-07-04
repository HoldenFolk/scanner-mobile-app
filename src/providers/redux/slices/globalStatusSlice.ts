import { AppState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isScanning: false,
	isConnecting: false,
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
	},
});

// Selectors
export const getIsScanning = (state: AppState) => state.globalStatus.isScanning;
export const getIsConnecting = (state: AppState) =>
	state.globalStatus.isConnecting;

export const { setScanning, setConnecting } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;

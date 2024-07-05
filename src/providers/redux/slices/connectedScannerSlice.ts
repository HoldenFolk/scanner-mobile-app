import { AppState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	mac: '',
	bleID: '',
	wifiSSID: '', //XXXDC added
	wifiPSWD: '', //XXXDC added
	isConfigured: false, //XXXDC added
	wifiList: [],
	pending: {
		isLoadingWifiList: false,
	},
};

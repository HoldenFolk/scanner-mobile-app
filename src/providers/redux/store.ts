import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';
import globalStatusReducer, {
	globalStatusSlice,
} from './slices/globalStatusSlice';
import scannerDevicesReducer, {
	scannerDevicesSlice,
} from './slices/scannerDevicesSlice';

const reducers: Reducer = combineReducers({
	//all reducers should be put here
	[globalStatusSlice.name]: globalStatusReducer,
	[scannerDevicesSlice.name]: scannerDevicesReducer,
});

export const makeStore = () =>
	configureStore({
		reducer: reducers,
		devTools: true,
	});

// export an assembled wrapper
const store = makeStore();
export default store;

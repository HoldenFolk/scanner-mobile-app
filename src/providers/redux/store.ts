import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';
import globalStatusReducer, {
	globalStatusSlice,
} from './slices/globalStatusSlice';

const reducers: Reducer = combineReducers({
	//all reducers should be put here
	[globalStatusSlice.name]: globalStatusReducer,
});

export const makeStore = () =>
	configureStore({
		reducer: reducers,
		devTools: true,
	});

// export an assembled wrapper
const store = makeStore();
export default store;

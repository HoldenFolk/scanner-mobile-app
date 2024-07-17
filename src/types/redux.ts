import { makeStore } from '@/providers/redux/store';
import { Action, ThunkAction } from '@reduxjs/toolkit';

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

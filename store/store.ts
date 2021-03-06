import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { todoReducer } from './reducer';

export const store = configureStore({
    reducer: todoReducer,
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
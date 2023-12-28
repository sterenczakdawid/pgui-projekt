import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from './appSettingsSlice';

// export default configureStore({
// 	reducer: {},
// });

export const store = configureStore({
	reducer: {
		globalSettings: settingsReducer
	},
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
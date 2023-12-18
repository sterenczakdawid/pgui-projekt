import { createSlice } from "@reduxjs/toolkit";

export const appSettingsSlice = createSlice({
	name: "globalSettings",
	initialState: {
		language: "en",
		theme: "light",
	},
	reducers: {},
});

export default appSettingsSlice.reducer;

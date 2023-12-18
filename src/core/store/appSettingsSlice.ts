import { createSlice } from "@reduxjs/toolkit";

export const THEME_KEY = "theme";
export const LANGUAGE_KEY = "language";

export const appSettingsSlice = createSlice({
	name: "globalSettings",
	initialState: {
		language: window.localStorage.getItem(LANGUAGE_KEY) || "en",
		theme: window.localStorage.getItem(THEME_KEY) || "light",
	},
	reducers: {},
});

export default appSettingsSlice.reducer;

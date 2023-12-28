import { createSlice } from "@reduxjs/toolkit";

interface settingsState {
	language: "en" | "pl";
	theme: "light" | "dark";
	// cos tam cos tam
}

const initialState: settingsState = {
	language: "en",
	theme: "light",
}


export const appSettingsSlice = createSlice({
	name: "globalSettings",
	initialState,
	reducers: {
		LANG: (state) => {
			if (state.language == "en") {
				state.language = "pl";
			} else {
				state.language = "en";
			}
		},
		changeTheme: (state) => {
			if (state.theme == "light") {
				state.theme = "dark";
			} else {
				state.theme = "light";
			}
		}
	},
});

export const { LANG, changeTheme } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

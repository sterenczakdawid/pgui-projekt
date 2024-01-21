import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, users } from "../constants/user.const";

interface settingsState {
	// language: "en" | "pl";
	theme: "light" | "dark";
	user: User;
}

const initialState: settingsState = {
	// language: "en",
	theme: "light",
	user: users[2],
}


export const appSettingsSlice = createSlice({
	name: "globalSettings",
	initialState,
	reducers: {
		// changeLang: (state) => {
		// 	if (state.language == "en") {
		// 		state.language = "pl";
		// 	} else {
		// 		state.language = "en";
		// 	}
		// },
		changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
			state.theme = action.payload;
		},
		addShop: (state, action: PayloadAction<number>) => {
			if (!state.user.ownedShops.includes(action.payload)){
				state.user.ownedShops.push(action.payload);
			}
			state.user.currentShop = action.payload;
		},
		changeShop: (state, action: PayloadAction<number>) => {
			if (state.user.ownedShops.includes(action.payload))
			state.user.currentShop = action.payload;
		},
		logIn: (state, action: PayloadAction<number>) => {
			state.user = users[action.payload]
		}
	},
});

export const { /*changeLang,*/ changeTheme, addShop, changeShop, logIn } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

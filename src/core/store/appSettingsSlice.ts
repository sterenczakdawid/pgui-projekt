import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, users } from "../constants/user.const";
import { labelsDay, labelsWeek, labelsMonth, labelsWeekEnglish, labelsMonthEnglish } from "../constants/labels.const";

interface settingsState {
	lang: 'pl' | 'en';
	theme: "light" | "dark";
	user: User;
	chart: {
		range: string,
		measure: string,
		labels: string[],
		isPrevious: boolean,
	}
}

const initialState: settingsState = {
	lang: 'en',
	theme: "light",
	user: users[2],
	chart: {
		range: 'day',
		measure: "turnover",
		labels: [
			'1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00',
			'11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
			'21:00', '22:00', '23:00', '24:00'
		],
		isPrevious: false
	}
}


export const appSettingsSlice = createSlice(
	{
		name: "globalSettings",
		initialState,
		reducers: {
			changeLang: (state, action: PayloadAction<'pl'|'en'>) => {
				state.lang = action.payload;
				changeChartLabels(state.chart.range);
			},
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
			},
			logOut: (state) => {
				state.user = users[0];
			},
			changeChartRange: (state, action: PayloadAction<string>) =>{
				state.chart.range = action.payload;
				changeChartLabels(action.payload)
			},
			changeChartMeasure: (state, action: PayloadAction<string>) => {
				state.chart.measure = action.payload;
			},
			changeChartLabels: (state, action: PayloadAction<string>) => {
				state.chart.labels = action.payload === 'day' ? labelsDay : action.payload === 'week' ? state.lang === 'pl' ? labelsWeek : labelsWeekEnglish : state.lang === 'pl' ? labelsMonth : labelsMonthEnglish;
			},
			changeChartIsPrevious: (state, action: PayloadAction<boolean>) => {
				state.chart.isPrevious = action.payload;
			}
		},
	},
);

export const { changeLang, changeTheme, addShop, changeShop, logIn, changeChartIsPrevious, changeChartMeasure, changeChartRange, changeChartLabels, logOut } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;

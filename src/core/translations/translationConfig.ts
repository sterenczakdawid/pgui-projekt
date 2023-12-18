import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "../translations/en/global.json";
import global_pl from "../translations/pl/global.json";

const resources = {
	pl: {
		translation: global_pl,
	},
	en: {
		translation: global_en,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: document.querySelector("html")?.lang,
		fallbackLng: "en",

		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;

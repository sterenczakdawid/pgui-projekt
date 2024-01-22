import { useEffect, useRef, useState } from "react";
import { RootState } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { changeLang, changeTheme } from "../core/store/appSettingsSlice";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Menu = () => {
	const [activeThemeButton, setActiveThemeButton] = useState("light");
	const [activeLangButton, setActiveLangButton] = useState("en");
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const dispatch = useDispatch();
	const isFirstRender = useRef(true);
	const { t } = useTranslation();
	const { i18n } = useTranslation();

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		updateBodyClass(theme);
	}, [theme]);

	const handleThemeChange = (theme: "light" | "dark") => {
		dispatch(changeTheme(theme));
		setActiveThemeButton(theme);
	};


	const changeLanguage = (language: 'pl'|'en') => {
		i18n.changeLanguage(language);
		setActiveLangButton(language);
		dispatch(changeLang(language))
	};

	const updateBodyClass = (newTheme: string) => {
		document.body.classList.remove(`body-light-theme`, `body-dark-theme`);
		document.body.classList.add(`body-${newTheme}-theme`);
		document.querySelectorAll(".card").forEach((cardElement) => {
			// Usuń istniejące klasy elementu
			cardElement.classList.remove(`card-light-theme`, `card-dark-theme`);

			// Dodaj nową klasę do elementu
			cardElement.classList.add(`card-${newTheme}-theme`);
		});
	};

	return (
		<div className="sidebar flex flex-col items-center bg-[#5a57ff] z-[2]">
			<h1 className="text-white font-bold text-4xl leading-[60px]">
				{t("Dashboard")}
			</h1>
			<div className="flex flex-col items-center justify-center w-full my-5 text-sm">
				<NavLink
					to="/"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					{t("Dashboard")}
				</NavLink>
				<NavLink
					to="/orders"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					{t("Orders")}
				</NavLink>
				<NavLink
					to="/sales-quality"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					{t("Quality")}
				</NavLink>
				<NavLink
					to="/customer-reviews"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					{t("Opinions")}
				</NavLink>
				<NavLink
					to="/sales-advice"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					{t("Advice")}
				</NavLink>
			</div>
			<div>
				<button
					className={`left ranking__button border-white ${
						activeThemeButton === "dark" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("dark")}>
					🌑
				</button>
				<button
					className={`right ranking__button border-white ${
						activeThemeButton === "light" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("light")}>
					☀️
				</button>
			</div>
			<h2>{theme}</h2>
			<div>
				<button
					className={`left ranking__button border-white ${
						activeLangButton === "en" ? "active__theme__button" : ""
					}`}
					onClick={() => changeLanguage("en")}>
					🇬🇧
				</button>
				<button
					className={`right ranking__button border-white ${
						activeLangButton === "pl" ? "active__theme__button" : ""
					}`}
					onClick={() => changeLanguage("pl")}>
					🇵🇱
				</button>
			</div>
			{/* <button onClick={() => dispatch(changeTheme())}>Change theme</button> */}
			<button className="text-white text-center h-[72px] leading-[72px] w-full">
			{t("Logout")}
			</button>
		</div>
	);
};

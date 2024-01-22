import { useEffect, useRef, useState } from "react";
import { RootState } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { changeLang, changeTheme } from "../core/store/appSettingsSlice";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsXLg } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { BsJournalBookmark } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
import { BsBookmarkStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsLock } from "react-icons/bs";

export const Menu = ({ showSidebar, toggleSidebar }) => {
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

	const changeLanguage = (language: "pl" | "en") => {
		i18n.changeLanguage(language);
		setActiveLangButton(language);
		dispatch(changeLang(language));
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
		<div
			className={`sidebar flex flex-col items-center bg-[#5a57ff] z-[2] ${
				showSidebar ? "show-sidebar" : "hide-sidebar"
			}`}>
			<div className="close-icon" onClick={toggleSidebar}>
				<BsXLg />
			</div>
			<h1 className="text-white font-bold text-4xl leading-[70px] text-center w-full">
				{t("Dashboard")}
			</h1>

			<div className="flex flex-col items-center justify-center w-full my-5 text-[1rem]">
				<NavLink
					to="/"
					className="text-white h-[72px] leading-[72px] w-[70%] flex justify-left items-center">
					{" "}
					<BsHouse className="text-xl mx-2" />
					{t("Dashboard")}
				</NavLink>
				<NavLink
					to="/orders"
					className="text-white h-[72px] leading-[72px] w-[70%] flex justify-left items-center">
					<BsCardChecklist className="text-xl mx-2" />
					{t("Orders")}
				</NavLink>
				<NavLink
					to="/sales-quality"
					className="text-white h-[72px] leading-[72px] w-[70%] flex justify-left items-center">
					<BsBookmarkStar className="text-xl mx-2" />
					{t("Quality")}
				</NavLink>
				<NavLink
					to="/customer-reviews"
					className="text-white h-[72px] leading-[72px] w-[70%] flex justify-left items-center">
					<BsStarHalf className="text-xl mx-2" />
					{t("Opinions")}
				</NavLink>
				<NavLink
					to="/sales-advice"
					className="text-white h-[72px] leading-[72px] w-[70%] flex justify-left items-center">
					<BsJournalBookmark className="text-xl mx-2" />
					{t("Advice")}
				</NavLink>
			</div>
			<button className="text-white h-[72px] leading-[72px] w-full flex items-center justify-center absolute bottom-[60px]">
				<BsLock className="text-xl mx-2" />
				{t("Logout")}
			</button>
			<div className="absolute bottom-0 left-[10%]">
				<button
					className={`left ranking__button border-white ${
						activeThemeButton === "dark" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("dark")}>
					<span className="block w-[20px] h-[22px]">🌑</span>
				</button>
				<button
					className={`right ranking__button border-white ${
						activeThemeButton === "light" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("light")}>
					<span className="block w-[20px] h-[22px]">☀️</span>
				</button>
			</div>
			<div className="absolute bottom-0 right-[10%] text-[30px]">
				<button
					className={`left ranking__button border-white  ${theme === "dark" ? activeLangButton === 'en' ? 'active__theme__button' : "text-[#353535]" : activeLangButton === 'pl' ? 'active__theme__button' : ""}`}
					onClick={() => changeLanguage("en")}>
					<span className="block w-[20px] h-[22px]">EN</span>
				</button>
				<button
					className={`right ranking__button border-white ${theme === "dark" ? activeLangButton === 'pl' ? 'active__theme__button' : "text-[#353535]" : activeLangButton === 'en' ? 'active__theme__button' : ""}`}
					onClick={() => changeLanguage("pl")}>
					<span className="block w-[20px] h-[22px]">PL</span>
				</button>
			</div>
		</div>
	);
};

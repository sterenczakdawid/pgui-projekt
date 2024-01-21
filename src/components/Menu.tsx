import { useEffect, useRef, useState } from "react";
import { RootState } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../core/store/appSettingsSlice";
import { NavLink } from "react-router-dom";

export const Menu = () => {
	const [activeButton, setActiveButton] = useState("light");
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const dispatch = useDispatch();
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		updateBodyClass(theme);
	}, [theme]);

	const handleThemeChange = (theme: string) => {
		dispatch(changeTheme());
		setActiveButton(theme);
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
				Dashboard
			</h1>
			<div className="flex flex-col items-center justify-center w-full my-5 text-sm">
				<NavLink
					to="/"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					Dashboard
				</NavLink>
				<NavLink
					to="/orders"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					Zamówienia
				</NavLink>
				<NavLink
					to="/sales-quality"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					Jakość sprzedaży
				</NavLink>
				<NavLink
					to="/customer-reviews"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					Opinie kupujących
				</NavLink>
				<NavLink
					to="/sales-advice"
					className="text-white h-[72px] leading-[72px] w-[70%] text-left">
					Porady sprzedażowe
				</NavLink>
			</div>
			<div>
				<button
					className={`left ranking__button border-white ${
						activeButton === "dark" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("dark")}>
					🌑
				</button>
				<button
					className={`right ranking__button border-white ${
						activeButton === "light" ? "active__theme__button" : ""
					}`}
					onClick={() => handleThemeChange("light")}>
					☀️
				</button>
			</div>
			<h2>{theme}</h2>
			{/* <button onClick={() => dispatch(changeTheme())}>Change theme</button> */}
			<button className="text-white text-center h-[72px] leading-[72px] w-full">
				Wyloguj
			</button>
		</div>
	);
};

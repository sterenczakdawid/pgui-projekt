import { useEffect, useRef } from "react";
import { RootState } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../core/store/appSettingsSlice";
import { NavLink } from "react-router-dom";

export const Menu = () => {
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

	const updateBodyClass = (newTheme: string) => {
		document.body.classList.remove(`body-light-theme`, `body-dark-theme`);
		document.body.classList.add(`body-${newTheme}-theme`);
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
			<h2>{theme}</h2>
			<button onClick={() => dispatch(changeTheme())}>Change theme</button>
			<button className="text-white text-center h-[72px] leading-[72px] w-full">
				Wyloguj
			</button>
		</div>
	);
};

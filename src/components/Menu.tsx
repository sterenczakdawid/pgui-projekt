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
		<div className="sidebar flex flex-col justify-around items-center bg-[#5a57ff]">
			<h1 className="text-white font-bold text-4xl">Dashboard</h1>

			<NavLink to="/orders" className="text-white">
				Dashboard
			</NavLink>
			<NavLink to="/orders" className="text-white">
				Zamówienia
			</NavLink>
			<NavLink to="/sales-quality" className="text-white">
				Jakość sprzedaży
			</NavLink>
			<NavLink to="/customer-reviews" className="text-white">
				Opinie kupujących
			</NavLink>
			<NavLink to="/sales-advice" className="text-white">
				Porady sprzedażowe
			</NavLink>
			<h2>{theme}</h2>
			<button onClick={() => dispatch(changeTheme())}>Change theme</button>
		</div>
	);
};

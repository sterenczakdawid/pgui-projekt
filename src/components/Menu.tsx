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
		<div className="sidebar bg-[#5a57ff]">
			<NavLink to="/orders" className="text-white absolute top-[500px]">
				dupa
			</NavLink>
			<h2>{theme}</h2>
			<button onClick={() => dispatch(changeTheme())}>Change theme</button>
		</div>
	);
};

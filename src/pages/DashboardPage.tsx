import { useDispatch, useSelector } from "react-redux";
import { Menu, TopBar } from "../components";
import {
	CustomerReviewsWidget,
	OfferRankingWidget,
	OrderWidget,
	SalesAdviceWidget,
	SalesChartWidget,
	SalesQualityWidget,
} from "../components";
import { RootState } from "../core/store/store";
import { changeTheme } from "../core/store/appSettingsSlice";
import { useEffect, useRef } from "react";

export const DashboardPage = () => {
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
		<div>
			<h2>{theme}</h2>
			<button onClick={() => dispatch(changeTheme())}>Change theme</button>
			<TopBar />
			<Menu />
			<CustomerReviewsWidget />
			<OfferRankingWidget />
			<OrderWidget />
			<SalesAdviceWidget />
			<SalesChartWidget />
			<SalesQualityWidget />
		</div>
	);
};

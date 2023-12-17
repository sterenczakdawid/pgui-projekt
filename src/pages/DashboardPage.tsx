import { Menu, TopBar } from "../components";
import {
	CustomerReviewsWidget,
	OfferRankingWidget,
	OrderWidget,
	SalesAdviceWidget,
	SalesChartWidget,
	SalesQualityWidget,
} from "../components";

export const DashboardPage = () => {
	return (
		<div>
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

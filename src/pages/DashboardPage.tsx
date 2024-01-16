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
		<div className="dashboard">
			<OrderWidget />
			<SalesQualityWidget />
			<OfferRankingWidget />
			<SalesChartWidget />
			<CustomerReviewsWidget />
			<SalesAdviceWidget />
		</div>
	);
};

import { useEffect, useState } from "react";
import { TitleLink } from "../layout/TitleLink";
import { RootState } from "../../core/store/store";
import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";
import { Review } from "../../core/constants/reviews.const";
import { useTranslation } from "react-i18next";

export const CustomerReviewsWidget = () => {
	const [activeButton, setActiveButton] = useState("all");
	const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
	const shopId = useSelector(
		(state: RootState) => state.globalSettings.user.currentShop
	);
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const reviews = shops[shopId - 1].reviews;
	const { t } = useTranslation();

	const handleSort = (type: string) => {
		const sortedReviews = [...reviews];

		let filteredReviews;

		if (type === "all") {
			// For 'all', take the first 5 reviews from the original list
			filteredReviews = sortedReviews.slice(0, 5);
		} else {
			// For 'positive' or 'negative', apply filtering and sorting
			filteredReviews = sortedReviews.filter((review) => {
				const rating = parseFloat(review.rating);
				switch (type) {
					case "positive":
						return rating >= 3;
					case "negative":
						return rating < 3;
					default:
						return true;
				}
			});

			filteredReviews.sort((a, b) => {
				const ratingA = parseFloat(a.rating);
				const ratingB = parseFloat(b.rating);
				return ratingB - ratingA;
			});
		}

		setActiveButton(type);
		setVisibleReviews(filteredReviews.slice(0, 5));
	};

	useEffect(() => {
		handleSort("all");
	}, [reviews]);

	return (
		<div className="card">
			<TitleLink title={t("Opinions")} link={"/customer-reviews"} />
			<div className="flex p-2.5 items-center justify-center">
				<span className="text-sm m-1 font-bold">{t("Show")}: </span>
				<div>
					<button
						className={`left ranking__button h-[25px] p-0 text-[12px] w-[90px] ${theme === "dark" ? activeButton === 'all' ? 'active__ranking__button' : "bg-[#353535]" : activeButton === 'all' ? "active__ranking__button" : ""} transition duration-300 ease-linear`}
						onClick={() => handleSort("all")}>
						{t("All")}
					</button>
					<button
						className={`ranking__button h-[25px] p-0 text-[12px] w-[90px] ${theme === "dark" ? activeButton === 'positive' ? 'active__ranking__button' : "bg-[#353535]" : activeButton === 'positive' ? "active__ranking__button" : ""} transition duration-300 ease-linear`}
						onClick={() => handleSort("positive")}>
						{t("Positive")}
					</button>
					<button
						className={`right ranking__button h-[25px] p-0 text-[12px] w-[90px] ${theme === "dark" ? activeButton === 'negative' ? 'active__ranking__button' : "bg-[#353535]" : activeButton === 'negative' ? "active__ranking__button" : ""} transition duration-300 ease-linear`}
						onClick={() => handleSort("negative")}>
						{t("Negative")}
					</button>
				</div>
			</div>
			{visibleReviews.map((res, idx) => (
				<div className="flex flex-col" key={idx}>
					<div className="flex justify-between px-2">
						<span className="text-m text-left w-[25%]">{res.user}</span>
						<span className="text-m text-left w-[15%]">{res.rating}</span>
						<span className={`text-m text-left w-[60%] rounded-md px-1 ${theme === "dark" ? "bg-[#353535]" : "bg-[#faf9ff]"} transition duration-300 ease-linear`}>
							{res.text}
						</span>
					</div>
					<span className="w-[100%] h-[0.5px] bg-[#5a57ff] mt-1 mb-2"></span>
				</div>
			))}
		</div>
	);
};

import { useEffect, useState } from "react";
import { TitleLink } from "../layout/TitleLink";
import { RootState } from "../../core/store/store";
import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";
import { Review } from "../../core/constants/reviews.const";

export const CustomerReviewsWidget = () => {
	const [activeButton, setActiveButton] = useState("all");
	const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
	const shopId = useSelector(
		(state: RootState) => state.globalSettings.user.currentShop
	);
	const reviews = shops[shopId - 1].reviews;

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
			<TitleLink title={"Opinie kupujących"} link={"/customer-reviews"} />
			<div className="flex p-2.5 items-center justify-center">
				<span className="text-sm m-1 font-bold">Pokaż: </span>
				<div>
					<button
						className={`left ranking__button ${
							activeButton === "all" ? "active__ranking__button" : ""
						} h-[25px] p-0 text-[12px] w-[90px]`}
						onClick={() => handleSort("all")}>
						wszystkie
					</button>
					<button
						className={`ranking__button ${
							activeButton === "positive" ? "active__ranking__button" : ""
						} h-[25px] p-0 text-[12px] w-[90px]`}
						onClick={() => handleSort("positive")}>
						pozytywne
					</button>
					<button
						className={`right ranking__button ${
							activeButton === "negative" ? "active__ranking__button" : ""
						} h-[25px] p-0 text-[12px] w-[90px]`}
						onClick={() => handleSort("negative")}>
						negatywne
					</button>
				</div>
			</div>
			{visibleReviews.map((res, idx) => (
				<div className="flex flex-col" key={idx}>
					<div className="flex justify-between px-2">
						<span className="text-m text-left w-[25%]">{res.user}</span>
						<span className="text-m text-left w-[15%]">{res.rating}</span>
						<span className="text-m text-left w-[60%] bg-[#faf9ff] rounded-md px-1">
							{res.text}
						</span>
					</div>
					<span className="w-[100%] h-[0.5px] bg-[#5a57ff] mt-1 mb-2"></span>
				</div>
			))}
		</div>
	);
};

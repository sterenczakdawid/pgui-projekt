import { useEffect, useState } from "react";
import { Product } from "../../core/constants/products.const";
import { RootState } from "../../core/store/store";
import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";
import { useTranslation } from "react-i18next";

export const OfferRankingWidget = () => {
	const [activeButton, setActiveButton] = useState("mostSold");
	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
	const shopId = useSelector(
		(state: RootState) => state.globalSettings.user.currentShop
	);
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const products = shops[shopId - 1].products;
	const { t } = useTranslation();

	const handleSort = (type: string) => {
		const sortedProducts = [...products];

		if (type === "mostSold") {
			sortedProducts.sort((a, b) => {
				if (b.sold !== a.sold) {
					return b.sold - a.sold;
				} else {
					return b.turnover - a.turnover;
				}
			});
		} else if (type === "leastSold") {
			sortedProducts.sort((a, b) => {
				if (a.sold !== b.sold) {
					return a.sold - b.sold;
				} else {
					return b.views - a.views;
				}
			});
		}

		setActiveButton(type);
		setVisibleProducts(sortedProducts.slice(0, 5));
	};

	useEffect(() => {
		handleSort("mostSold");
	}, [products]);

	return (
		<div className="card">
			<h1 className="card__title">{t("Offers")}</h1>
			<div className="flex p-2.5 flex-col items-center">
				<span className="text-sm m-1">{t("ShowProducts")}</span>
				<div>
					<button
						className={`left ranking__button ${theme === "dark" ? activeButton === 'mostSold' ? 'active__ranking__button' : "bg-[#353535]" : activeButton === 'mostSold' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleSort("mostSold")}>
						{t("Often")}
					</button>
					<button
						className={`right ranking__button ${theme === "dark" ? activeButton === 'leastSold' ? 'active__ranking__button' : "bg-[#353535]" : activeButton === 'leastSold' ? "active__ranking__button" : ""} transition duration-300 ease-linear`}
						onClick={() => handleSort("leastSold")}>
						{t("Rarely")}
					</button>
				</div>
				{visibleProducts.map((res, idx) => (
					<div className="flex items-center">
						<span className="circle"></span>
						<div className="flex flex-col" key={idx}>
							<span className="font-bold text-xl">{res.name}</span>
							<span className="text-sm">
							{t("Sold")}: <b>{res.sold}</b>
							</span>
							<span className="text-sm">
								{activeButton === "mostSold" ? (
									<>
										{t("Turnover")}: <b>{res.turnover} zł</b>
									</>
								) : (
									<>
										{t("Views")}: <b>{res.views}</b>
									</>
								)}
							</span>
						</div>
					</div>
				))}
				<span>
					{visibleProducts.length === 0 ? <>Nie ma żadnych ofert</> : ""}
				</span>
			</div>
		</div>
	);
};

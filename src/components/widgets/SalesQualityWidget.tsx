import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";
import { TitleLink } from "../layout/TitleLink";
import { RootState } from "../../core/store/store";
import { useTranslation } from "react-i18next";

export const SalesQualityWidget = () => {
	const shopId = useSelector((state:RootState) => state.globalSettings.user.currentShop);
	const aspects = shops[shopId-1].aspects;
	const { t } = useTranslation();

	const translations = ["Shipping", "CustomerService", "ProductsQuality", "ReturnAbility", "Communication", "Price"];

	return <div className="card">
		<TitleLink title={t("Quality")} link={"/sales-quality"}/>
		{
			aspects.length === 0 ? <>{t("NoQuality")}</> : 
			<>
				<div className="flex p-2.5 flex-col">
					<div className="flex justify-between mt-2 items-center space-x-8">
						<span className="text-sm">{t("QualityCat")}</span>
						<span className="quality__cat">C</span>
					</div>
					<div className="flex justify-between mt-2 items-center space-x-8">
						<span className="text-sm">{t("QualityRating")}</span>
						<span className="font-bold">21/30</span>
					</div>
					<hr className="line" />
					<span className="text-center mb-2">{t("WorstAspects")}:</span>
					{aspects.map((res, idx) => {
					// Konwersja stringa na liczbę
					const ratingValue = parseFloat(res.rating);

					return (
						<div className="mt-3 flex justify-between items-center" key={idx}>
							<span className="w-40">
								{t(translations[(idx + shopId) % 6])}
							</span>
							<div className="outer-bar">
								<div
									className="inner-bar"
									style={{ width: `${(ratingValue / 5) * 100}%` }}></div>
							</div>
							<div className="flex justify-evenly space-x-8">
								<span className="font-bold text-sm mx-2">{res.rating}</span>
							</div>
						</div>
					);
				})}
				</div>
			</>
		}
	</div>;
};

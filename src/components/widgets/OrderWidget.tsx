// import { tabs } from "../../core/constants/products.const";
import { useSelector } from "react-redux";
import { TitleLink } from "../layout/TitleLink";
import { RootState } from "../../core/store/store";
import { shops } from "../../core/constants/shop.const";
import { useTranslation } from "react-i18next";

export const OrderWidget = () => {
	const shopId = useSelector((state:RootState) => state.globalSettings.user.currentShop);
	const orders = shops[shopId-1].orders;
	const { t } = useTranslation();
	const translations = ["NotSent", "NotPaid", "Returns"];

	return <div className="card">
		<TitleLink title={t("Orders")} link={"/orders"}/>
		<div className="mt-10">
			{
				orders.map((res, idx)=>(
					<div className="order__tab flex justify-between" key={idx}>
						<span>{t(translations[idx])}</span>
						<div className="flex justify-evenly space-x-8">
							<span className="font-bold text-xl">{res.quantity}</span>
							<span className="material-symbols-outlined">
								arrow_forward_ios
							</span>
						</div>
						
					</div>
				))
			}
		</div>
	</div>;
};

import { useTranslation } from "react-i18next";

export const SalesChartWidget = () => {
	const { t } = useTranslation();
	
	return <div className="card">
		<h1 className="card__title">{t("Chart")}</h1>
	</div>;
};

import { useTranslation } from "react-i18next";
import { TitleLink } from "../layout/TitleLink";

export const SalesAdviceWidget = () => {

	const { t } = useTranslation();

	return (
		<div className="card">
			<TitleLink title={t("Advice")} link={"/sales-advice"} />
			<div className="flex flex-col justify-center items-center">
				<div className="font-bold text-xl mt-5">{t("DailyAdvice")}</div>
				<div className="text-center mt-2">
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</div>
			</div>
		</div>
	);
};

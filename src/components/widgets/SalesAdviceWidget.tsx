import { TitleLink } from "../layout/TitleLink";

export const SalesAdviceWidget = () => {
	return (
		<div className="card">
			<TitleLink title={"Porady sprzedażowe"} link={"/sales-advice"} />
			<div className="flex flex-col justify-center items-center">
				<div className="font-bold text-xl mt-5">Porada na dziś</div>
				<div className="text-center mt-2">
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</div>
			</div>
		</div>
	);
};

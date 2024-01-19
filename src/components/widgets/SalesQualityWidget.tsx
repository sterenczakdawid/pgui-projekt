import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";
import { TitleLink } from "../layout/TitleLink";
import { RootState } from "../../core/store/store";

export const SalesQualityWidget = () => {
	const shopId = useSelector((state:RootState) => state.globalSettings.user.currentShop);
	const aspects = shops[shopId-1].aspects;


	return <div className="card">
		<TitleLink title={"Jakość sprzedaży"} link={"/sales-quality"}/>
		<div className="flex p-2.5 flex-col">
			<div className="flex justify-between mt-2 items-center space-x-8">
				<span className="text-sm">Kategoria jakości</span>
				<span className="quality__cat">C</span>
			</div>
			<div className="flex justify-between mt-2 items-center space-x-8">
				<span className="text-sm">Ocena jakości</span>
				<span className="font-bold">21/30</span>
			</div>
			<hr className="line" />
			<span className="text-center mb-2">Najgorzej oceniane aspekty:</span>
			{
				aspects.map((res, idx)=>(
					<div className="mt-3 flex justify-between" key={idx}>
						<span className="w-40">{res.name}</span>
						<div className="outer-bar">
							<div className="inner-bar"></div>
						</div>
						<div className="flex justify-evenly space-x-8">
							<span className="font-bold text-sm">{res.rating}</span>
						</div>						
					</div>
				))
			}
		</div>
	</div>;
};

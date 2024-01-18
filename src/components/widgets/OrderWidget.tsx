import { tabs } from "../../core/data/data";
import { TitleLink } from "../layout/TitleLink";

export const OrderWidget = () => {

	return <div className="card">
		<TitleLink title={"Zamówienia"} link={"/orders"}/>
		<div className="mt-10">
			{
				tabs.map((res, idx)=>(
					<div className="order__tab flex justify-between" key={idx}>
						<span>{res.name}</span>
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

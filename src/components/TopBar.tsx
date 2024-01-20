import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { changeShop } from "../core/store/appSettingsSlice";

export const TopBar = () => {
	const user = useSelector((state: RootState) => state.globalSettings.user);
	const ownedShops = user.ownedShops;
	const dispatch = useDispatch();

	const changeShopDisplayed = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue !== "") {
			dispatch(changeShop(+selectedValue));
		}
	};

	return (
		<div className="topbar flex justify-between items-center gap-4 border-b-2 border-b-[#5a57ff] z-[1]">
			<select className="font-bold rounded-3xl h-[50px] border-[#5a57ff] ml-[260px]" onChange={changeShopDisplayed} value={user.currentShop}>
				<option value="">Wybierz opcję</option>
				{ownedShops.map((shopId) => (
					<option key={shopId} value={shopId}>
						Sklep {shopId}
					</option>
				))}
			</select>
			<div className="mr-6 flex justify-center items-center">
				<div className="flex flex-col ">
					<span className="font-bold">{user.name} </span>
					<span className="text-[#cccccc]">{user.email}</span>
				</div>
				<span className="circle ml-3"></span>
			</div>
		</div>
	);
};

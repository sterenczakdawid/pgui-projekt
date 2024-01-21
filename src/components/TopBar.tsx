import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { changeShop } from "../core/store/appSettingsSlice";
import { useTranslation } from "react-i18next";

export const TopBar = () => {
	const user = useSelector((state: RootState) => state.globalSettings.user);
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const ownedShops = user.ownedShops;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const changeShopDisplayed = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue !== "") {
			dispatch(changeShop(+selectedValue));
		}
	};

	return (
		<div className={`${theme === "dark" ? 'bg-[#353535]' : 'bg-white'} topbar flex justify-between items-center gap-4 border-b-2 border-b-[#5a57ff] z-[1]`}>
			<select className={`${theme === "dark" ? 'bg-[#353535]' : 'bg-white'} font-bold rounded-3xl h-[50px] w-[140px] border-[#5a57ff] ml-[260px] transition duration-300 ease-linear`} onChange={changeShopDisplayed} value={user.currentShop}>
				<option value="">
					{t("Option")}
				</option>
				{ownedShops.map((shopId) => (
					<option key={shopId} value={shopId}>
						{t("Shop")} {shopId}
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

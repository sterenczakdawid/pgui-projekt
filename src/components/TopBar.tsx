import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { changeShop } from "../core/store/appSettingsSlice";


export const TopBar = () => {
	const user = useSelector((state:RootState) => state.globalSettings.user);
	const ownedShops = user.ownedShops;
	const dispatch = useDispatch();

	const changeShopDisplayed = (event) => {
		const selectedValue = event.target.value;
		if (selectedValue !== ""){
			dispatch(changeShop(+selectedValue))
		}
	};

	return <div className="topbar flex justify-end gap-4 border-b-2 border-b-[#5a57ff] z-[1]">
		<select onChange={changeShopDisplayed} value={user.currentShop}>
			<option value="">Wybierz opcję</option>
			{ownedShops.map((shopId) => (
			<option key={shopId} value={shopId}>
				Sklep {shopId}
			</option>
			))}
		</select>
		<div className="mr-4">
			Użytkownik: {user.name} <br />
			sklep: {user.currentShop} <br />
		</div>
	</div>;
};

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, TopBar } from "../components";
import { DashboardPage } from "../pages";

export const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const showSidebarF = () => {
		setShowSidebar(true);
	}

	const hideSidebarF = () => {
		setShowSidebar(false);
	}
	
	return (
		<>
			<TopBar toggleSidebar={showSidebarF}/>
			<Menu showSidebar={showSidebar} toggleSidebar={ hideSidebarF}/>
			<DashboardPage />
			<Outlet />
		</>
	);
};

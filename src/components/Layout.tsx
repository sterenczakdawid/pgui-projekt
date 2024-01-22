import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { fakeAuthProvider } from "../core/auth";
import { DashboardPage } from "../pages";
import { Menu, TopBar } from "../components";
import { useState } from "react";

export const Layout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const showSidebarF = () => {
		setShowSidebar(true);
	}

	const hideSidebarF = () => {
		setShowSidebar(false);
	}
	// const location = useLocation();
	// const navigate = useNavigate();

	// const onLogout = (event: { preventDefault: () => void }) => {
	// 	event.preventDefault();
	// 	fakeAuthProvider.signout(() => {
	// 		navigate("/login");
	// 	});
	// };
	return (
		<>
			<TopBar toggleSidebar={showSidebarF}/>
			<Menu showSidebar={showSidebar} toggleSidebar={ hideSidebarF}/>
			<DashboardPage />

			{/* <div>
				<div>
					{fakeAuthProvider.isAuthenticated ? (
						<>
							<div>
								<span>Zalogowany jako: {fakeAuthProvider.username} </span>
								<a style={{ marginLeft: "10px" }} onClick={onLogout} href="#">
									(Wyloguj)
								</a>
							</div>

							<br />
						</>
					) : (
						<Link
							style={{ marginLeft: "10px" }}
							to="/login"
							state={{ from: location.pathname }}>
							(Zaloguj)
						</Link>
					)}
				</div>
				<div>
					<DashboardPage />
				</div>
			</div> */}
			{/* <Outlet /> */}
		</>
	);
};

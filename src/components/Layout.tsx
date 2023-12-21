import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { fakeAuthProvider } from "../core/auth";
import { DashboardPage } from "../pages";

export const Layout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const onLogout = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		fakeAuthProvider.signout(() => {
			navigate("/login");
		});
	};
	return (
		<div>
			<div>
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
			</div>
			<Outlet />
		</div>
	);
};

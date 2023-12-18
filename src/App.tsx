import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	useLocation,
	Navigate,
	useNavigate,
	Link,
} from "react-router-dom";
import "./App.css";
import { fakeAuthProvider } from "./core/auth";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<ProtectedPath>
						<Layout />
					</ProtectedPath>					
				}>
				{/* <Route path="/" element={<DashboardPage />}> */}
					{/* <Route
						path="main"
						element={
							<div className="App">
								<h1>Demonstrator autentykacji</h1>
							</div>
						}
					/> */}
					{/* <Route
						path="private"
						element={
							<ProtectedPath>
								<Outlet />
							</ProtectedPath>
						}>
					</Route> */}
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

interface ProtectedPathProps {
	children: React.ReactNode;
}

function ProtectedPath({ children }: ProtectedPathProps) {
	const location = useLocation();
	return fakeAuthProvider.isAuthenticated ? (
		children
	) : (
		<Navigate to="/login" state={{ from: location.pathname }} />
	);
}

function Layout() {
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
							
				<br/>
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
					<DashboardPage/>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

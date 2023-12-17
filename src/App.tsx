import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	useLocation,
	Navigate,
	useNavigate,
	useMatch,
	Link,
} from "react-router-dom";
import "./App.css";
import { fakeAuthProvider } from "./core/auth";
// import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";

// export default function App() {
// 	return <DashboardPage />;
// }

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
				{/* <Route path="/" element={<DashboardPage />}> */}
					<Route
						path="main"
						element={
							<div className="App">
								<h1>Demonstrator autentykacji</h1>
							</div>
						}
					/>
					<Route
						path="private"
						element={
							<ProtectedPath>
								<Outlet />
							</ProtectedPath>
						}>
					</Route>
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
	const m = useMatch("/private/:page");
	const onLogout = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		fakeAuthProvider.signout(() => {
			navigate("/main");
		});
	};
	return (
		<div>
			<div>
				<Link to="main">Strona główna</Link>
				<Link
					style={{
						marginLeft: "10px",
						// fontWeight: m?.params?.page === "first" ? "bold" : "normal",
					}}
					to="private/dashboard">
					Strona chroniona 1
				</Link>
				{fakeAuthProvider.isAuthenticated ? (
					<Link
						style={{
							marginLeft: "10px",
							fontWeight: m?.params?.page === "second" ? "bold" : "normal",
						}}
						to="private/second">
						Strona chroniona 2
					</Link>
				) : (
					""
				)}

				<div style={{ float: "right" }}>
					{fakeAuthProvider.isAuthenticated ? (
						<>
							<span>Zalogowany jako: {fakeAuthProvider.username} </span>
							<a style={{ marginLeft: "10px" }} onClick={onLogout} href="#">
								(Wyloguj)
							</a>
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
			</div>
			<Outlet />
		</div>
	);
}

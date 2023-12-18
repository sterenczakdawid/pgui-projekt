import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import "./App.css";
import { fakeAuthProvider } from "./core/auth";
import { LoginPage, OrderPage } from "./pages";
import { Layout } from "./components";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedPath>
							<Layout />
						</ProtectedPath>
					}
				/>
				<Route
					path="/orders"
					element={
						<ProtectedPath>
							<OrderPage />
						</ProtectedPath>
					}
				/>
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

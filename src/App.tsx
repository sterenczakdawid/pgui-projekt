import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import "./App.css";
import { fakeAuthProvider } from "./core/auth";
import { I18nextProvider } from "react-i18next";
import i18n from "./core/translations/translationConfig";
import { CustomerReviewsPage, LoginPage, OrderPage, SalesAdvicePage, SalesQualityPage } from "./pages";
import { Layout } from "./components";

export default function App() {
	return (
		<I18nextProvider i18n={i18n}>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						// <ProtectedPath>
						<Layout />
						// </ProtectedPath>
					}
				/>
				<Route
					path="/orders"
					element={
						// <ProtectedPath>
						<OrderPage />
						// </ProtectedPath>
					}
				/>
				<Route
					path="/customer-reviews"
					element={
						// <ProtectedPath>
						<CustomerReviewsPage />
						// </ProtectedPath>
					}
				/>
				<Route
					path="/sales-advice"
					element={
						// <ProtectedPath>
						<SalesAdvicePage />
						// </ProtectedPath>
					}
				/>
				<Route
					path="/sales-quality"
					element={
						// <ProtectedPath>
						<SalesQualityPage />
						// </ProtectedPath>
					}
				/>
				{/* <Route path="/login" element={<LoginPage />} /> */}
			</Routes>
		</BrowserRouter>
		</I18nextProvider>
	);
}

// interface ProtectedPathProps {
// 	children: React.ReactNode;
// }

// function ProtectedPath({ children }: ProtectedPathProps) {
// 	const location = useLocation();
// 	return fakeAuthProvider.isAuthenticated ? (
// 		children
// 	) : (
// 		<Navigate to="/login" state={{ from: location.pathname }} />
// 	);
// }

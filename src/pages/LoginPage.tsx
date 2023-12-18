import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fakeAuthProvider } from "../core/auth";

export function LoginPage() {
	const [loginMessage, setLoginMessage] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		fakeAuthProvider.signin(
			data.get("username") as string,
			data.get("password") as string,
			(status: string) => {
				console.log(status);
				if (status === "success") {
					// console.log(location.state);
					if (location?.state?.from) navigate(location.state.from);
					else navigate("/");
				} else setLoginMessage(status);
			}
		);
	};

	return (
		<div>
			Wprowadź dane logowania:
			<form onSubmit={handleSubmit}>
				Nazwa użytkownika:{" "}
				<input
					onChange={() => {
						setLoginMessage(null);
					}}
					name="username"
					type="text"
				/>
				<br />
				Hasło: <input name="password" type="password" />
				<br />
				{loginMessage ? <div style={{ color: "red" }}>{loginMessage}</div> : ""}
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}

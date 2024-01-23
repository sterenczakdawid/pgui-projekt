import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fakeAuthProvider } from "../core/auth";
import { useDispatch } from "react-redux";
import { logIn } from "../core/store/appSettingsSlice";

export function LoginPage() {
	const [loginMessage, setLoginMessage] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		fakeAuthProvider.signin(
			data.get("username") as string,
			data.get("password") as string,
			(status: string) => {
				console.log(status);
				if (status === "piotrek") {
					// console.log(location.state);
					dispatch(logIn(1))
					if (location?.state?.from) navigate(location.state.from);
					else navigate("/");
				} else if (status === "dawid") {
					dispatch(logIn(2))
					if (location?.state?.from) navigate(location.state.from);
					else navigate("/");
				}
				else setLoginMessage(status);
			}
		);
	};

	return (
		<div className="w-[50vw] ml-[25vw] mr-[25vw] mt-[25vh]">
			Wprowadź dane logowania:
			<br />
			<br />
			<form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
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

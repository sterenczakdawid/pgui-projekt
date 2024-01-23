export const fakeAuthProvider = {

	isAuthenticated: false,
	username: null as null | string,
	signin: (
		username: string,
		password: string,
		callback: (result: string) => void
	) => {
		if (
			(username === "piotrek" && password === "piotrek123") ||
			(username === "dawid" && password === "dawid123")
		) {
			fakeAuthProvider.isAuthenticated = true;
			fakeAuthProvider.username = username;
			setTimeout(() => {
				callback(username);
			}, 100);
		} else {
			setTimeout(() => {
				callback("Nieprawidłowe dane logowania");
			}, 100);
		}
	},
	signout: (callback: () => void) => {
		fakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	},
};

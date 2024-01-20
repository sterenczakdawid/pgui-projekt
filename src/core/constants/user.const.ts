export interface User {
	name: string;
	password: string;
	email: string;
	ownedShops: number[]; // id
	currentShop: number; // id
}

export const users: User[] = [
	{
		name: "niezalogowany",
		password: "niezalogowany",
		email: "niezalogowany@mail.pl",
		ownedShops: [],
		currentShop: -1,
	},
	{
		name: "piotrek",
		password: "piotrek",
		email: "piotrek@mail.pl",
		ownedShops: [1, 2, 3],
		currentShop: 1,
	},
	{
		name: "dawid",
		password: "dawid",
		email: "dawid@mail.pl",
		ownedShops: [2, 3, 5],
		currentShop: 2,
	},
];

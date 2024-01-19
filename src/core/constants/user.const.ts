
export interface User {
    name: string;
    password: string;
    ownedShops: number[]; // id
    currentShop: number; // id
}

export const users: User[] = [
    {
        name: "niezalogowany",
        password: "niezalogowany",
        ownedShops: [],
        currentShop: -1
    },
    {
        name: "piotrek",
        password: "piotrek",
        ownedShops: [1, 2, 3],
        currentShop: 1
    },
    {
        name: "dawid",
        password: "dawid",
        ownedShops: [2, 3, 5],
        currentShop: 2
    },
]
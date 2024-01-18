export interface Product {
	name: string;
	sold: number;
	turnover: number;
	views: number;
}

export const products: Product[] = [
	{name: "Produkt 1", sold: 8, turnover: 222, views: 13}, 
	{name: "Produkt 2", sold: 10, turnover: 135, views: 17}, 
	{name: "Produkt 3", sold: 2, turnover: 65, views: 5}, 
	{name: "Produkt 4", sold: 5, turnover: 180, views: 9}, 
	{name: "Produkt 5", sold: 12, turnover: 360, views: 20},
	{name: "Produkt 6", sold: 3, turnover: 30, views: 7}, 
	{name: "Produkt 7", sold: 15, turnover: 495, views: 31}, 
	{name: "Produkt 8", sold: 21, turnover: 840, views: 45}, 
	{name: "Produkt 9", sold: 6, turnover: 110, views: 11}, 
	{name: "Produkt 10", sold: 17, turnover: 570, views: 36},
];

export const tabs = [
    {name: "Nieopłacone", quantity: 77}, 
    {name: "Niewysłane", quantity: 22}, 
    {name: "Zwroty", quantity: 13}
];

export const aspects = [
    {name: "Czas dostawy", rating: "4.0/5"}, 
    {name: "Obsługa klienta", rating: "3.5/5"}, 
    {name: "Jakość produktów", rating: "3.0/5"}
];
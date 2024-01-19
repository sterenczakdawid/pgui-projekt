import { Aspect, aspects1, aspects2, aspects3, aspects4, aspects5 } from "./aspects.const";
import { Order, orders1, orders2, orders3, orders4, orders5 } from "./orders.const";
import { Product, products1, products2, products3, products4, products5 } from "./products.const";


export interface Shop {
    id: number;
    products: Product[];
    aspects: Aspect[];
    orders: Order[];
    name: string;
    password: string;
    // opinions: Opinion[];
}

export const shop1: Shop = {
    id: 1,
    products: products1,
    aspects: aspects1,
    orders: orders1,
    name: "shop1",
    password: "shop1"
}

export const shop2: Shop = {
    id: 2,
    products: products2,
    aspects: aspects2,
    orders: orders2,
    name: "shop2",
    password: "shop2"
}

export const shop3: Shop = {
    id: 3,
    products: products3,
    aspects: aspects3,
    orders: orders3,
    name: "shop3",
    password: "shop3"
}

export const shop4: Shop = {
    id: 4,
    products: products4,
    aspects: aspects4,
    orders: orders4,
    name: "shop4",
    password: "shop4"
}

export const shop5: Shop = {
    id: 5,
    products: products5,
    aspects: aspects5,
    orders: orders5,
    name: "shop5",
    password: "shop5"
}

export const shops: Shop[] = [
    shop1, shop2, shop3, shop4, shop5
]
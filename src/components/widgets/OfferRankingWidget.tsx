import { useEffect, useState } from "react";

interface Product {
	name: string;
	sold: number;
	turnover: string;
  }

const products: Product[] = [
	{name: "Produkt 1", sold: 8, turnover: "222 zł"}, 
	{name: "Produkt 2", sold: 10, turnover: "135 zł"}, 
	{name: "Produkt 3", sold: 2, turnover: "65 zł"}, 
	{name: "Produkt 4", sold: 5, turnover: "180 zł"}, 
	{name: "Produkt 5", sold: 12, turnover: "360 zł"},
	{name: "Produkt 6", sold: 3, turnover: "30 zł"}, 
	{name: "Produkt 7", sold: 15, turnover: "495 zł"}, 
	{name: "Produkt 8", sold: 21, turnover: "840 zł"}, 
	{name: "Produkt 9", sold: 6, turnover: "110 zł"}, 
	{name: "Produkt 10", sold: 17, turnover: "570 zł"},
];

export const OfferRankingWidget = () => {
	const [activeButton, setActiveButton] = useState('mostSold');
	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

	const handleSort = (type: string) => {
		const sortedProducts = [...products];

		if (type === 'mostSold') {
			sortedProducts.sort((a, b) => b.sold - a.sold);
		} else if (type === 'leastSold') {
			sortedProducts.sort((a, b) => a.sold - b.sold);
		}

		setActiveButton(type);
		setVisibleProducts(sortedProducts.slice(0, 5));
	};

	useEffect(() => {
		handleSort("mostSold");
	}, []);

	return <div className="card">
		<h1 className="card__title">Ranking ofert</h1>
		<div className="flex p-2.5 flex-col items-center">
			<span className="text-sm m-1">Wyświetl produkty kupowane</span>
			<div>
			<button
				className={`left ranking__button ${activeButton === 'mostSold' ? 'active__ranking__button' : ''}`}
				onClick={() => handleSort('mostSold')}
			>
				najczęściej
			</button>
			<button 
				className={`right ranking__button ${activeButton === 'leastSold' ? 'active__ranking__button' : ''}`}
				onClick={() => handleSort('leastSold')}
			>
				najrzadziej
			</button>
			</div>
			{
				visibleProducts.map((res, idx)=>(
					<div className="flex items-center">
						<span className="circle"></span>
						<div className="flex flex-col" key={idx}>
							<span className="font-bold text-xl">{res.name}</span>
							<span className="text-sm">Sprzedanych sztuk: <b>{res.sold}</b></span>
							<span className="text-sm">Obrót: <b>{res.turnover}</b></span>
						</div>
					</div>
				))
			}		
		</div>
	</div>;
};

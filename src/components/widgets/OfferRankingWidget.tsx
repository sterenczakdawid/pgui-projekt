import { useEffect, useState } from "react";
import { Product } from "../../core/constants/products.const";
import { RootState } from "../../core/store/store";
import { useSelector } from "react-redux";
import { shops } from "../../core/constants/shop.const";

export const OfferRankingWidget = () => {
	const [activeButton, setActiveButton] = useState('mostSold');
	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
	const shopId = useSelector((state:RootState) => state.globalSettings.user.currentShop);
	const products = shops[shopId-1].products;

	const handleSort = (type: string) => {
		const sortedProducts = [...products];

		if (type === 'mostSold') {
			sortedProducts.sort((a, b) => {
				if (b.sold !== a.sold) {
				return b.sold - a.sold; 
				} else {
				return b.turnover - a.turnover;
				}
			});
		} else if (type === 'leastSold') {
			sortedProducts.sort((a, b) => {
				if (a.sold !== b.sold) {
				return a.sold - b.sold;
				} else {
				return b.views - a.views;
				}
			});
		}

		setActiveButton(type);
		setVisibleProducts(sortedProducts.slice(0, 5));
	};

	useEffect(() => {
		handleSort("mostSold");
	}, [products]);

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
							<span className="text-sm">Sprzedane sztuki: <b>{res.sold}</b></span>
							<span className="text-sm">
								{activeButton === 'mostSold'
									? <>Obrót: <b>{res.turnover} zł</b></>
									: <>Unikalne wyświetlenia: <b>{res.views}</b></>
								}
							</span>
						</div>
					</div>
				))
			}		
			<span>{visibleProducts.length === 0 ? <>Nie ma żadnych ofert</> : ''}</span>
		</div>
	</div>;
};

import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import favEmoji from "./../image/fav-emoji.svg";
import arrow from "./../image/arrow.svg";
import { useNavigate } from "react-router-dom";

function Favourites({ items, onAddToFavourite, isItemFavourited }) {
	const navigate = useNavigate();
	const [showEmpty, setShowEmpty] = useState(false);

	useEffect(() => {
		// если список пустой — показываем сообщение
		setShowEmpty(items.length === 0);
	}, [items]);

	return (
		<div className="content p-40">
			{items.length > 0 ? (
				<div>
					<div className="d-flex justify-between align-center mb-40">
						<h1>Мои закладки</h1>
					</div>
					<div className="d-flex flex-wrap">
						{items.map((item) => (
							<Card
								key={item.id}
								id={item.id}
								title={item.name}
								price={item.price}
								image={item.imageUrl}
								favourited={isItemFavourited(item)}
								onFav={onAddToFavourite}
							/>
						))}
					</div>
				</div>
			) : (
				showEmpty && (
					<div className="fav_content">
						<img src={favEmoji} alt="favEmoji" className="fav_emoji" />
						<h1>Закладок нет :(</h1>
						<p>Вы ничего не добавляли в закладки</p>
						<button className="greenButton" onClick={() => navigate("/")}>
							<img src={arrow} className="back" alt="Back" /> Вернуться назад
						</button>
					</div>
				)
			)}
		</div>
	);
}

export default Favourites;

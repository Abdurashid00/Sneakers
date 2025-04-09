import React from "react";
import greyHeart from "./../../image/greyHeart.svg";
import redHeart from "./../../image/redHeart.svg";
import plus from "./../../image/plus.svg";
import checked from "./../../image/btnChecked.svg";

import styles from "./Card.module.scss";

function Card({
	onFav,
	image,
	title,
	price,
	onPlus,
	favourited = false,
	id,
	added = false,
	
}) {
	const [isAdded, setIsAdded] = React.useState(added);
	const [isFav, setIsFav] = React.useState(favourited);

  React.useEffect(() => {
    setIsAdded(added);  // Обновляем состояние, когда added меняется
  }, [added]);
  React.useEffect(() => {
    setIsFav(favourited);  // Обновляем состояние, когда added меняется
  }, [favourited]);

	const onClickPlus = () => {
		onPlus({ imageUrl: image, name: title, price, id });

		setIsAdded(!isAdded);
	};

	const onClickFav = () => {
		onFav({ imageUrl: image, name: title, price, id });
		setIsFav(!isFav);
	};

	return (
		<div className={styles.card}>
			{onFav && <div className="favorite" onClick={onClickFav}>
				<img src={isFav ? redHeart : greyHeart} alt="unliked" />
			</div>}
			<img src={image} width={133} height={112} alt="" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} rub</b>
				</div>
				{onPlus && <img
					className={styles.plus}
					src={isAdded ? checked : plus}
					alt=""
					onClick={onClickPlus}
				/>}
			</div>
		</div>
	);
}

export default Card;

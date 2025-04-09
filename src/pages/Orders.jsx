import React from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import orderEmoji from "./../image/order-emoji.svg";
import arrow from "./../image/arrow.svg";
import { useNavigate } from "react-router-dom";


export default function Orders({ isItemAdded, isItemFavourited, item = [] }) {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigate = useNavigate();
	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					"https://b663fe059daecda8.mokky.dev/orders",
				);
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при получении заказов");
				console.error(error);
			}
		})();
	}, []);
	return (
		<div className="content p-40">
			{Array.length > 0 ? (
				<>
					<div className="d-flex align-center justify-between mb-40">
						<h1>Мои заказы</h1>
					</div>
					<div className="d-flex flex-wrap">
						{(isLoading ? [...Array(8)] : orders).map((item, index) => (
							<Card
								key={item?.id || index}
								id={item?.id || index}
								title={item?.name}
								price={item?.price.toLocaleString()}
								image={item?.imageUrl}
								added={item && isItemAdded(item)}
								favourited={item && isItemFavourited(item)}
								isLoading={isLoading}
							/>
						))}
					</div>{" "}
				</>
			) : (
				<div className="fav_content">
					<img src={orderEmoji} alt="favEmoji" className="fav_emoji" />
					<h1>У вас нет заказов</h1>
					<p>
						Вы нищеброд?
						<br /> Оформите хотя бы один заказ.
					</p>
					<button className="greenButton" onClick={() => navigate("/")}>
						<img src={arrow} className="back" alt="Back" /> Вернуться
						назад
					</button>
				</div>
			)}
		</div>
	);
}

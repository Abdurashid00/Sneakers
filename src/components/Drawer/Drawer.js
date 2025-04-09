import React from "react";
import axios from "axios";
import arrow from "../../image/arrow.svg";
import emptyCart from "../../image/empty-box.svg";
import orderedCart from "../../image/orderedCart.svg";
import btnRemove from "../../image/btn-remove.svg";
import Info from "../Info";
import styles from "./Drawer.module.scss";




const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], setCartItems, cartItems, opened }) {
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	
	const [orderId, setOrderId] = React.useState(null);

	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
	
	const totalPriceTax = cartItems.reduce(
		(sum, obj) => Math.round((obj.price + sum) * 0.05 * 100) / 100,0);
	
		const onClickOrder = async () => {
		try {
			const { data } = await axios.post(
				"https://b663fe059daecda8.mokky.dev/orders",
				{ items: cartItems },
			);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(
					"https://b663fe059daecda8.mokky.dev/cart/" + item.id,
				);
				await delay(1000);
			}
		} catch (error) {
			alert("Ошибка при создании заказа");
		}
	};

	return (
		<div className={`${styles.overlay} ${ opened ? styles.overlayVisible: ''}`}>
			<div className={styles.drawer}>
				<h2 className="mb-30 ">
					Корзина
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src={btnRemove}
						alt="remove"
					/>
				</h2>

				{items.length > 0 ? (
					<div className="d-flex flex-column justify-between drawer-content">
						<div className="items">
							{items.map((obj) => (
								<div
									key={obj.id}
									className="cart-item d-flex align-center mb-20">
									<div
										style={{
											backgroundImage: `url(${obj.imageUrl})`,
										}}
										className="cart-item-img"></div>
									<div className="mr-20 flex">
										<p className="mb-5">{obj.name}</p>
										<b>{obj.price.toLocaleString()} rub</b>
									</div>
									<img
										className="removeBtn"
										src={btnRemove}
										alt="remove"
										onClick={() => onRemove(obj.id)}
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice.toLocaleString()} rub.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{totalPriceTax} rub.</b>
								</li>
							</ul>
							<button onClick={onClickOrder} className="greenButton">
								Оформить заказ
								<img src={arrow} alt="" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						describtion={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
						}
						image={isOrderComplete ? orderedCart : emptyCart}
						setCartOpened={onClose}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;

import React from "react";
import logoImg from "./../image/logo.svg";
import telejka from "./../image/telejka.svg";
import fav from "./../image/fav.svg";
import union from "./../image/Union.svg";
import { Link } from "react-router-dom";

function Header({ cartItems, onClickCart }) {
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to={"/"} className="d-flex align-center cu-p">
				<div className="d-flex align-center ">
					<img src={logoImg} width={40} height={40} alt="" />
					<div>
						<h3 className="text-uppercase"> React sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className="d-flex align-center">
				<li
					onClick={onClickCart}
					className="mr-30 d-flex align-center cu-p">
					<img src={telejka} alt="" />
					<span>{totalPrice.toLocaleString()} rub</span>
				</li>
				<li className="mr-30">
					<Link to={"/favourites"} className="d-flex align-center cu-p">
						<img src={fav} alt="" />
						<span>Закладки</span>
					</Link>
				</li>
				<li className="mr-30 d-flex align-center">
                    <Link to={"/orders"} className="d-flex align-center cu-p">
					<img src={union} alt="" />
					<span>Профиль</span>
                    </Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;

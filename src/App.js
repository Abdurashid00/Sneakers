import React from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

function App() {
	
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [fav, setFav] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cardOpened, setCardOpened] = React.useState(false);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favResponse, itemsResponse] =
					await Promise.all([
						axios.get("https://b663fe059daecda8.mokky.dev/cart"),
						axios.get("https://b663fe059daecda8.mokky.dev/favourites"),
						axios.get("https://b663fe059daecda8.mokky.dev/items"),
					]);

				setItems(itemsResponse.data);
				setCartItems(cartResponse.data);
				setFav(favResponse.data);
			} catch (error) {
				alert("Oshibka ");
			}
		}
		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			const foundItem = cartItems.find(
				(item) =>
					item.name === obj.name &&
					item.imageUrl === obj.imageUrl &&
					item.price === obj.price,
			);

			if (foundItem) {
				await axios.delete(
					`https://b663fe059daecda8.mokky.dev/cart/${foundItem.id}`,
				);
				setCartItems((prev) =>
					prev.filter((item) => item.id !== foundItem.id),
				);
			} else {
				const { data } = await axios.post(
					"https://b663fe059daecda8.mokky.dev/cart",
					obj,
				);
				setCartItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert("Ошибка при добавлении/удалении из корзины");
			console.error(error);
		}
	};

	const onAddToFavourite = async (obj) => {
		try {
			// Проверяем, есть ли товар в закладках
			const foundItem = fav.find(
				(item) =>
					item.imageUrl === obj.imageUrl &&
					item.name === obj.name &&
					item.price === obj.price,
			);

			if (foundItem) {
				// Если товар уже в закладках, удаляем его
				await axios.delete(
					`https://b663fe059daecda8.mokky.dev/favourites/${foundItem.id}`, // удаляем по id
				);
				setFav((prev) => prev.filter((item) => item.id !== foundItem.id));
			} else {
				// Добавляем товар в закладки
				const { data } = await axios.post(
					"https://b663fe059daecda8.mokky.dev/favourites",
					obj,
				);
				setFav((prev) => [...prev, data]); // data содержит новый id от сервера
			}
		} catch (error) {
			alert("Не удалось добавить/удалить из закладок");
			console.error(error);
		}
	};

	const onRemoveItem = (id) => {
		axios.delete(`https://b663fe059daecda8.mokky.dev/cart/${id}`).then(() => {
			setCartItems((prev) => prev.filter((item) => item.id !== id));
		});
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (obj) => {
		return cartItems.some(
			(item) =>
				item.imageUrl === obj.imageUrl &&
				item.name === obj.name &&
				item.price === obj.price,
		);
	};
	const isItemFavourited = (obj) => {
		return fav.some(
			(item) =>
				item.imageUrl === obj.imageUrl &&
				item.name === obj.name &&
				item.price === obj.price,
		);
	};

	return (
		<div className="wrapper clear">
			<Drawer
				items={cartItems}
				onClose={() => setCardOpened(false)}
				onRemove={onRemoveItem}
				setCartItems={setCartItems}
				cartItems={cartItems}
				opened={cardOpened}
			/>
			<Header
				onClickCart={() => setCardOpened(true)}
				cartItems={cartItems}
			/>

			<Routes>
				<Route
					path="/"
					element={
						<Home
							cartItems={cartItems}
							searchValue={searchValue}
							items={items}
							onChangeSearchInput={onChangeSearchInput}
							setSearchValue={setSearchValue}
							onAddToFavourite={onAddToFavourite}
							onAddToCart={onAddToCart}
							isItemAdded={isItemAdded}
							isItemFavourited={isItemFavourited}
						/>
					}
				/>
				<Route
					path="/Favourites"
					element={
						<Favourites
							items={fav}
							onAddToFavourite={onAddToFavourite}
							isItemFavourited={isItemFavourited}
						/>
					}
				/>
				<Route
					path="/Orders"
					element={
						<Orders
							onAddToFavourite={onAddToFavourite}
							onAddToCart={onAddToCart}
							isItemAdded={isItemAdded}
							isItemFavourited={isItemFavourited}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;

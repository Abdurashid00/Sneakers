import Card from "../components/Card/Card";
import search from "./../image/search.svg";
import btnRemove from "./../image/btn-remove.svg";

function Home({
	items,
	cartItems,
	searchValue,
	setSearchValue,
	onAddToCart,
	onChangeSearchInput,
	isItemAdded,
	isItemFavourited,
	onAddToFavourite
}) {
	console.log(cartItems);

	return (
		<div className="content p-40">
			<div className="d-flex justify-between align-center mb-40">
				<h1>
					{searchValue
						? `Поиск по запросу: ${searchValue}`
						: "Все кроссовки"}
				</h1>
				<div className="search-block d-flex mb-40">
					<img src={search} alt="search" />
					{searchValue && (
						<img
							onClick={() => {
								setSearchValue("");
							}}
							className="clear removeBtn cu-p"
							src={btnRemove}
							alt="remove"
						/>
					)}
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder="Поиск..."
					/>
				</div>
			</div>

			<div className="d-flex flex-wrap">
				{items
					.filter((item) =>
						item.name.toLowerCase().includes(searchValue.toLowerCase()),
					)
					.map((item) => (
						<Card
							key={item.id}
							id={item.id}
							title={item.name}
							price={item.price}
							image={item.imageUrl}
							onPlus={(obj) => onAddToCart(obj)}
							added={isItemAdded(item)}
							onFav={onAddToFavourite}
							favourited={isItemFavourited(item)}
						/>
					))}
			</div>
		</div>
	);
}

export default Home;

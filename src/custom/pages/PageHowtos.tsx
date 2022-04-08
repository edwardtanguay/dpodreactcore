/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialItems from '../models/model_howtos';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode, loadItems, forceConsistentStateData } =
		props;
	const [items, setItems] = useState<IHowto[]>([]);

	useEffect(() => {
		setItems([...loadItems(_initialItems)]);
	}, [id, searchText, idCode]);

	const handleSearchClick = () => {
		forceConsistentStateData({ searchText: 'google' });
	};
	const handleIdClick = () => {
		forceConsistentStateData({ id: 344 });
	};
	const handleIdCodeClick = () => {
		forceConsistentStateData({ idCode: 'oldestFirst' });
	};

	return (
		<div className="page page_howtos">
			<div>There are {items.length} items.</div>
			<hr />
			<button onClick={handleSearchClick}>Search</button>
			<button onClick={handleIdClick}>Id</button>
			<button onClick={handleIdCodeClick}>IdCode</button>
			{items.map((item, i) => {
				return (
					<div key={i}>
						{item.systemWhenCreated} - {item.title}
					</div>
				);
			})}
		</div>
	);
}

export default PageHowtos;

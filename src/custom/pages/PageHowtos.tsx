/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialHowtos from '../models/model_howtos';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode, loadItems, forceConsistentStateData } =
		props;
	const [items, setItems] = useState<IHowto[]>([]);

	useEffect(() => {
		setItems([...loadItems()]);
	}, [id, searchText, idCode]);

	const handleSearchClick = () => {
		forceConsistentStateData({ searchText: 'vim' });
	};
	const handleIdClick = (id: number) => {
		const item = _initialHowtos.find((m) => m.id === id);
		if (item !== undefined) {
			forceConsistentStateData({
				id: id,
				itemTitle: item.title,
			});
		}
	};
	const handleIdCodeClick = (idCode: string) => {
		forceConsistentStateData({ idCode });
	};

	return (
		<div className="page page_howtos">
			<div>There are {items.length} items.</div>
			<hr />
			<button onClick={handleSearchClick}>Search</button>
			<button onClick={() => handleIdClick(233)}>Id</button>
			<button onClick={() => handleIdCodeClick('oldestFirst')}>
				Oldest First
			</button>
			<button onClick={() => handleIdCodeClick('firstTen')}>
				First Ten
			</button>
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

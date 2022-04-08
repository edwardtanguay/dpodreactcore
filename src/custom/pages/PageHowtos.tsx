import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialItems from '../models/model_howtos';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode } = props;
	const [items, setItems] = useState<IHowto[]>([]);

	const loadItems = () => {
		setItems(_initialItems);
	};

	useEffect(() => {
		loadItems();
	}, [id, searchText, idCode]);
	// const handleClick = () => {
	// 	forceConsistentStateData({ idCode: 'lesson002' });
	// };

	return (
		<div className="page page_howtos">
			<div>There are {items.length} items.</div>
		</div>
	);
}

export default PageHowtos;

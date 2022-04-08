/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialItems from '../models/model_howtos';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode, loadItems } = props;
	const [items, setItems] = useState<IHowto[]>([]);

	useEffect(() => {
		setItems([...loadItems(_initialItems)]);
	}, [id, searchText, idCode]);
	// const handleClick = () => {
	// 	forceConsistentStateData({ idCode: 'lesson002' });
	// };

	return (
		<div className="page page_howtos">
			<div>There are {items.length} items.</div>
			<hr />
			{items.map((item) => {
				return (
					<div>
						{item.systemWhenCreated} - {item.title}
					</div>
				);
			})}
		</div>
	);
}

export default PageHowtos;

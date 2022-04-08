/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialItems from '../models/model_howtos';
import * as qarr from '../../system/qtools/qarr';
import * as qstr from '../../system/qtools/qstr';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode } = props;
	const [items, setItems] = useState<IHowto[]>([]);

	const loadItems = (): IHowto[] => {

		switch (true) {

			case id !== 0: {
				return _initialItems.filter((howto: IHowto) => howto.id === id);
			}
		case searchText !== '': {
			const items = _initialItems.filter((howto: IHowto) =>
				qstr.searchTextMatches(
					searchText,
					[howto.title, howto.body].join('|')
				)
			);
			return qarr.sortObjects(items, 'systemWhenCreated', 'desc');
		}

			case idCode !== '': {
				switch (idCode) {
					case 'oldestFirst':
						const items = [..._initialItems];
						return qarr.sortObjects(
							items,
							'systemWhenCreated',
							'asc'
						);
					case 'newestFirst':
					default:
						return qarr.sortObjects(
							_initialItems,
							'systemWhenCreated',
							'desc'
						);
				}
			}

			default: {
				return qarr.sortObjects(
					_initialItems,
					'systemWhenCreated',
					'desc'
				);
			}
		}
	};

	useEffect(() => {
		setItems([...loadItems()]);
	}, [id, searchText, idCode]);
	// const handleClick = () => {
	// 	forceConsistentStateData({ idCode: 'lesson002' });
	// };

	return (
		<div className="page page_howtos">
			<div>There are {items.length} items.</div>
			<hr />
			{items.map(item => {
				return (
					<div>{item.systemWhenCreated} - {item.title}</div>
				)
			})}
		</div>
	);
}

export default PageHowtos;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialHowtos from '../models/model_howtos';
import * as qstr from '../../system/qtools/qstr';
import { ItemPageHeader } from './itemPages/ItemPageHeader';
import { ItemPageHelmet } from './itemPages/ItemPageHelmet';
import { ItemPageSearch } from './itemPages/ItemPageSearch';
import { Howtos } from './itemPageItems/Howtos';
import { Howto } from './itemPageItems/Howto';

const pageTitle = `Edward's how-to instructions and code examples`;
const pageDescription =
	'How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Vue.js, etc.';

function PageHowtos(props: IItemPageProps) {
	const {
		id,
		searchText,
		idCode,
		loadItems,
		forceConsistentStateData,
		getUrlId,
		getUrlSearchText,
		getUrlIdCode,
	} = props;
	const [items, setItems] = useState<IHowto[]>([]);
	const refSearchText = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setItems([...loadItems()]);
		if (
			refSearchText.current !== null &&
			getUrlId() === 0 &&
			getUrlSearchText() === '' &&
			getUrlIdCode() === ''
		) {
			refSearchText.current.focus();
		}
	}, [id, searchText, idCode]);

	useEffect(() => {
		setTimeout(() => {
			if (refSearchText.current !== null) {
				refSearchText.current.focus();
			}
		}, 50);
	}, []);

	const showAllItems = () => {
		if (refSearchText.current !== null) {
			refSearchText.current.focus();
		}
		forceConsistentStateData({});
	};

	const displayOneItem = (id: number) => {
		forceConsistentStateData({ id, keepSearchText: true });
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};

	const displaySearchResults = (e: any) => {
		const searchText: string = e.target.value;
		forceConsistentStateData({ searchText });
	};

	const getCurrentItem = (): IHowto => {
		return items[0];
	};

	const convertBodyToBodyParsed = (howto: IHowto): string => {
		return qstr.parseOutline(howto.body, 'howtos');
	};

	return (
		<>
			<div className="page page_howtos">
				<ItemPageHeader
					items={items}
					searchText={searchText}
					_initialHowtos={_initialHowtos}
					showAllItems={showAllItems}
				/>

				<ItemPageSearch
					refSearchText={refSearchText}
					searchText={searchText}
					displaySearchResults={displaySearchResults}
					items={items}
				/>

				<Howtos items={items} displayOneItem={displayOneItem} searchText={searchText}/>

				<Howto items={items} getCurrentItem={getCurrentItem} convertBodyToBodyParsed={convertBodyToBodyParsed}/>
			</div>

			<ItemPageHelmet
				pageTitle={pageTitle}
				pageDescription={pageDescription}
			/>
		</>
	);
}

export default PageHowtos;

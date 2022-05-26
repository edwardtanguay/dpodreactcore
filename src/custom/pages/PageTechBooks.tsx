/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import '../styles/page_techBooks.scss';
import { IItemPageProps, ITechBook } from '../models/interfaces';
import _initialTechBooks from '../models/model_techBooks';
import * as qstr from '../../system/qtools/qstr';
import { ItemPageHeader } from './itemPages/ItemPageHeader';
import { ItemPageHelmet } from './itemPages/ItemPageHelmet';
import { ItemPageSearch } from './itemPages/ItemPageSearch';
import { TechBooks } from './itemPageItems/TechBooks';
import { TechBook } from './itemPageItems/TechBook';

const pageTitle = `Edward's Tech Books`;
const pageDescription =
	'Tech books I\'m reading to stay on the leading edge of technology.';

function PageTechBooks(props: IItemPageProps) {
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
	const [items, setItems] = useState<ITechBook[]>([]);
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
			if (refSearchText.current !== null && getUrlId() === 0) {
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

	const getCurrentItem = (): ITechBook => {
		return items[0];
	};

	const convertNotesToNotesParsed = (techBook: ITechBook): string => {
		return qstr.parseOutline(techBook.notes, 'techBooks');
	};

	return (
		<>
			<div className="page page_techBooks">
				<ItemPageHeader
					items={items}
					searchText={searchText}
					_initialItems={_initialTechBooks}
					showAllItems={showAllItems}
					itemTypePluralTitleNotation={'TechBooks'}
				/>

				<ItemPageSearch
					refSearchText={refSearchText}
					searchText={searchText}
					displaySearchResults={displaySearchResults}
					items={items}
					itemTypePluralTextNotation="techBooks"
				/>

				<TechBooks
					items={items}
					displayOneItem={displayOneItem}
					searchText={searchText}
				/>

				<TechBook
					items={items}
					getCurrentItem={getCurrentItem}
					convertNotesToNotesParsed={convertNotesToNotesParsed}
				/>
			</div>

			<ItemPageHelmet
				pageTitle={pageTitle}
				pageDescription={pageDescription}
			/>
		</>
	);
}

export default PageTechBooks;

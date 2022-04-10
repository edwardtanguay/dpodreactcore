/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import '../styles/page_flashcards.scss';
import { IItemPageProps, IFlashcard } from '../models/interfaces';
import _initialFlashcards from '../models/model_flashcards';
import * as qstr from '../../system/qtools/qstr';
import { ItemPageHeader } from './itemPages/ItemPageHeader';
import { ItemPageHelmet } from './itemPages/ItemPageHelmet';
import { ItemPageSearch } from './itemPages/ItemPageSearch';
import { Flashcards } from './itemPageItems/Flashcards';
import { Flashcard } from './itemPageItems/Flashcard';

const pageTitle = `Edward's how-to instructions and code examples`;
const pageDescription =
	'How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Vue.js, etc.';

function PageFlashcards(props: IItemPageProps) {
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
	const [items, setItems] = useState<IFlashcard[]>([]);
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

	const getCurrentItem = (): IFlashcard => {
		return items[0];
	};

	const convertBodyToBodyParsed = (flashcard: IFlashcard): string => {
		return qstr.parseOutline(flashcard.back, 'flashcards');
	};

	return (
		<>
			<div className="page page_flashcards">
				<ItemPageHeader
					items={items}
					searchText={searchText}
					_initialItems={_initialFlashcards}
					showAllItems={showAllItems}
					itemTypePluralTitleNotation={'Flashcards'}
				/>

				<ItemPageSearch
					refSearchText={refSearchText}
					searchText={searchText}
					displaySearchResults={displaySearchResults}
					items={items}
					itemTypePluralTextNotation="flashcards"
				/>

				<Flashcards
					items={items}
					displayOneItem={displayOneItem}
					searchText={searchText}
				/>

				<Flashcard
					items={items}
					getCurrentItem={getCurrentItem}
					convertBodyToBodyParsed={convertBodyToBodyParsed}
				/>
			</div>

			<ItemPageHelmet
				pageTitle={pageTitle}
				pageDescription={pageDescription}
			/>
		</>
	);
}

export default PageFlashcards;

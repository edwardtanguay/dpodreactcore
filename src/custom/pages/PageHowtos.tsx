/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialHowtos from '../models/model_howtos';
import { Helmet } from 'react-helmet';

// const refSearchText = useRef<HTMLInputElement>(null);

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode, loadItems, forceConsistentStateData } =
		props;
	const [items, setItems] = useState<IHowto[]>([]);

	useEffect(() => {
		setItems([...loadItems()]);
	}, [id, searchText, idCode]);

	const showAllItems = () => {
		// if (refSearchText.current !== null) {
		// 	refSearchText.current.focus();
		// }
		forceConsistentStateData({ idCode: 'newestFirst' });
	};

	const displaySearchResults = (e: any) => {
		const searchText: string = e.target.value;
		forceConsistentStateData({ searchText });
	};

	return (
		<>
			<Helmet>
				<title>Edward's how-to instructions and code examples</title>
				<meta
					name="description"
					content="How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Vue.js, etc."
				/>
			</Helmet>
			<div className="page page_howtos">
				{/* ========== TITLE ========== */}
				{items.length > 1 && searchText === '' && (
					<h2 className="title">{items.length} Howtos</h2>
				)}
				{items.length === 1 && searchText === '' && (
					<h2 className="title oneOfMany">
						1 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length === 0 && searchText !== '' && (
					<h2 className="title oneOfMany">
						0 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length > 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						{items.length} of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{items.length === 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						1 of {_initialHowtos.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}



				{/* ========== SEARCH ========== */}
				<div className="searchArea">
					<div className="searchRow">
						<input id="mainSearch" placeholder="search howtos" type="text" value={searchText} className="form-control input-sm searchBox" onFocus={displaySearchResults} onChange={displaySearchResults} />
					</div>
				</div>

			</div>
		</>
	);
}

export default PageHowtos;

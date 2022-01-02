/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
// @ts-ignore
import { Helmet } from 'react-helmet';
import initialHowtos from '../models/model_howtos';
import { IHowto } from '../models/interfaces';
import * as qarr from '../../system/qtools/qarr';
import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';
import * as qdat from '../../system/qtools/qdat';

interface IItemsQueryObject {
	idCode: string,
	searchText: string,
	id: number
}

const getItems = (query: IItemsQueryObject) => {

	const { idCode, searchText, id } = query;

	if (idCode !== '') {
		switch (idCode) {
			case 'oldestFirst':
				qsys.changeBrowserState(document, 'howtos', '', '', `Edward's how-to instructions and code examples`);
				return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'asc');
			case 'newestFirst':
			default:
				return getInitialHowtos();
		}
	}

	if (searchText !== '') {
		return initialHowtos.filter((howto: IHowto) => qstr.searchTextMatches(searchText, [howto.title, howto.body].join('|')));
	}

	if (id !== 0) {
		return initialHowtos.filter((howto: IHowto) => howto.id === id);
	}

}

const getInitialHowtos = () => {
	qsys.changeBrowserState(document, 'howtos', '', '', `Edward's how-to instructions and code examples`);
	return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'desc');
}

const getDefaultItems = () => {
	const id: number = qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id'));

	// id
	if (id !== 0) {
		return getItems({ idCode: '', searchText: '', id });
	} else {

		// search
		const searchText = qsys.getParameterValueFromUrl('searchText');
		if (!qstr.isEmpty(searchText)) {
			return getItems({ idCode: '', searchText, id: 0 });
		} else {

			// idCode
			let idCode = qsys.getParameterValueFromUrl('idCode');
			if (qstr.isEmpty(idCode)) {
				idCode = 'newestFirst';
			}
			return getItems({ idCode, searchText: '', id: 0 });
		}
	}
}

function PageHowtos() {
	const [howtos, setHowtos] = useState<IHowto[]>(getDefaultItems());
	const [searchText, setSearchText] = useState<string>("");

	useEffect(() => {
		setHowtos([...getDefaultItems()]);
	}, [])

	// const getItems = (query: IItemsQueryObject) => {

	// 	const { idCode, searchText, id } = query;

	// 	if (idCode !== '') {
	// 		setSearchText('');
	// 		switch (idCode) {
	// 			case 'oldestFirst':
	// 				qsys.changeBrowserState(document, 'howtos', '', '', `Edward's how-to instructions and code examples`);
	// 				return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'asc');
	// 			case 'newestFirst':
	// 			default:
	// 				return getInitialHowtos();
	// 		}
	// 	}

	// 	if (searchText !== '') {
	// 		return initialHowtos.filter((howto: IHowto) => qstr.searchTextMatches(searchText, [howto.title, howto.body].join('|')));
	// 	}

	// 	if (id !== 0) {
	// 		return initialHowtos.filter((howto: IHowto) => howto.id === id);
	// 	}

	// }

	const getItemsById = (id: number) => {
		return getItems({ idCode: '', searchText: '', id });
	}


	const setItemsByIdCode = (idCode: string) => {
		const items = getItems({ idCode, searchText: '', id: 0 });
		setHowtos([...items]);
	}


	const getCurrentItem = (): IHowto => {
		const item = howtos[0];
		qsys.changeBrowserState(document, 'howtos', 'id', String(item.id), `${item.categoryTitle.toUpperCase()} HOWTO: ${item.title}`);
		return item;
	};

	const convertBodyToBodyParsed = (howto: IHowto): string => {
		return qstr.parseOutline(howto.body, 'howtos');
	}

	const setCurrentItemsById = (id: number) => {
		setHowtos([...getItemsById(id)]);
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	const displaySearchResults = (e: any) => {
		const searchText: string = e.target.value;
		setSearchText(searchText);
		if (searchText === '') {
			setItemsByIdCode('newestFirst');
		} else {
			const items = getItems({ idCode: '', searchText, id: 0 });
			setHowtos([...items]);
		}
	}

	return (
		<>
			<Helmet>
				<title>Edward's how-to instructions and code examples</title>
				<meta name="description" content="How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Google Sheets, etc." />
			</Helmet>


			<div className="page page_howtos">

				{/* ========== TITLE ========== */}
				{howtos.length > 1 && searchText === '' && (
					<h2 className="title">{howtos.length} Howtos</h2>
				)}
				{howtos.length === 1 && searchText === '' && (
					<h2 className="title oneOfMany">1 of {initialHowtos.length} <span className="itemTypeTitle" onClick={() => setItemsByIdCode('newestFirst')}>Howtos</span></h2>
				)}
				{howtos.length === 0 && searchText !== '' && (
					<h2 className="title oneOfMany">0 of {initialHowtos.length} <span className="itemTypeTitle" onClick={() => setItemsByIdCode('newestFirst')}>Howtos</span></h2>
				)}
				{howtos.length > 1 && searchText !== '' && (
					<h2 className="title oneOfMany">{howtos.length} of {initialHowtos.length} <span className="itemTypeTitle" onClick={() => setItemsByIdCode('newestFirst')}>Howtos</span></h2>
				)}
				{howtos.length === 1 && searchText !== '' && (
					<h2 className="title oneOfMany">1 of {initialHowtos.length} <span className="itemTypeTitle" onClick={() => setItemsByIdCode('newestFirst')}>Howtos</span></h2>
				)}

				{/* ========== SEARCH ========== */}
				<div className="searchArea">
					<div className="searchRow">
						<input id="mainSearch" placeholder="search" type="text" value={searchText} className="form-control input-sm searchBox" onFocus={displaySearchResults} onChange={displaySearchResults} />
					</div>
				</div>

				{/* ========== MULTIPLE RECORDS ========== */}
				{howtos.length > 1 && (
					<section className="howtos">
						{howtos.map((howto: any, i: number) => {
							return (
								<div key={i} className="overviewItem">
									<div className="header"><span className="createDate">{qdat.smartDateWithYear(howto.systemWhenCreated)}</span> <span className="category">{howto.categoryTitle}</span></div>
									<div key={i} className="itemLinkTitle" onClick={() => setCurrentItemsById(howto.id)}>{howto.title}</div>
								</div>
							)
						})}
					</section>
				)}

				{/* ========== ONE RECORD ========== */}
				{howtos.length === 1 &&
					(
						<div className="item">
							<div className="header">
								<div><span className="createDate">{qdat.smartDateWithYear(getCurrentItem().systemWhenCreated)}</span> <span className="category">{getCurrentItem().categoryTitle}</span></div>
								<div className="headerRow">
									<div className="title">{getCurrentItem().title}</div>
								</div>
							</div>
							<div className="body">
								<div className="codeArea" dangerouslySetInnerHTML={{ __html: convertBodyToBodyParsed(getCurrentItem()) }} />
							</div>
							{getCurrentItem().jsfiddleUrl &&
								(
									<div className="jsfiddleWrapper">
										<div className="title">jsfiddle:</div>
										<iframe title="JSFiddle" src={getCurrentItem().jsfiddleUrl} className="jsfiddle" width="100%" height="300" />
									</div>
								)
							}
						</div>
					)
				}

			</div>
		</>
	)
}

export default PageHowtos;
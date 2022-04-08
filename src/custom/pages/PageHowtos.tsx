/* eslint-disable react-hooks/exhaustive-deps */
// @ts-ignore
import { useState, useEffect, useRef } from 'react';
import '../styles/page_howtos.scss';
import { Helmet } from 'react-helmet';
import initialItems from '../models/model_howtos';
import {
	IHowto,
	IItemPageProps,
	IItemsQueryObject,
} from '../models/interfaces';
import * as qarr from '../../system/qtools/qarr';
import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';
import * as qdat from '../../system/qtools/qdat';

function PageHowtos(props: IItemPageProps) {
	const { getUrlId } = props;

	const [howtos, setHowtos] = useState<IHowto[]>([]);
	const [searchText, setSearchText] = useState<string>('');
	const refSearchText = useRef<HTMLInputElement>(null);

	const getItems = (query: IItemsQueryObject) => {
		const { idCode, searchText, id } = query;

		if (idCode !== '') {
			switch (idCode) {
				case 'oldestFirst':
					const items = [...initialItems];
					return qarr.sortObjects(items, 'systemWhenCreated', 'asc');
				case 'newestFirst':
				default:
					return getInitialItems();
			}
		}

		if (searchText !== '') {
			const items = initialItems.filter((howto: IHowto) =>
				qstr.searchTextMatches(
					searchText,
					[howto.title, howto.body].join('|')
				)
			);
			return qarr.sortObjects(items, 'systemWhenCreated', 'desc');
		}

		if (id !== 0) {
			return initialItems.filter((howto: IHowto) => howto.id === id);
		}
	};

	const getInitialItems = () => {
		qsys.changeBrowserState(
			document,
			'howtos',
			'',
			'',
			`Edward's how-to instructions and code examples`
		);
		return qarr.sortObjects(initialItems, 'systemWhenCreated', 'desc');
	};

	const getUrlSearchText = () => {
		return qsys.getParameterValueFromUrl('searchText');
	};
	const getUrlIdCode = () => {
		return qsys.getParameterValueFromUrl('idCode');
	};

	const getDefaultItems = () => {
		const id: number = getUrlId();

		// id
		if (id !== 0) {
			return getItems({ idCode: '', searchText: '', id });
		} else {
			// search
			const searchText = getUrlSearchText();
			if (!qstr.isEmpty(searchText)) {
				setSearchText(searchText);
				return getItems({ idCode: '', searchText, id: 0 });
			} else {
				// idCode
				let idCode = getUrlIdCode();
				if (qstr.isEmpty(idCode)) {
					idCode = 'newestFirst';
				}
				return getItems({ idCode, searchText: '', id: 0 });
			}
		}
	};

	useEffect(() => {
		setHowtos([...getDefaultItems()]);
		if (
			refSearchText.current !== null &&
			getUrlId() === 0 &&
			getUrlSearchText() === '' &&
			getUrlIdCode() === ''
		) {
			refSearchText.current.focus();
		}
	}, []);

	const getItemsById = (id: number) => {
		return getItems({ idCode: '', searchText: '', id });
	};

	const setItemsByIdCode = (idCode: string) => {
		setSearchText('');
		const items = getItems({ idCode, searchText: '', id: 0 });
		setHowtos([...items]);
	};

	const getCurrentItem = (): IHowto => {
		const item = howtos[0];
		qsys.changeBrowserState(
			document,
			'howtos',
			'id',
			String(item.id),
			`${item.categoryTitle.toUpperCase()} HOWTO: ${item.title}`
		);
		return item;
	};

	const convertBodyToBodyParsed = (howto: IHowto): string => {
		return qstr.parseOutline(howto.body, 'howtos');
	};

	const setCurrentItemsById = (id: number) => {
		setHowtos([...getItemsById(id)]);
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};

	const displaySearchResults = (e: any) => {
		const searchText: string = e.target.value;
		setSearchText(searchText);
		if (searchText === '') {
			setItemsByIdCode('newestFirst');
		} else {
			const items = getItems({ idCode: '', searchText, id: 0 });
			setHowtos([...items]);
			qsys.changeBrowserState(
				document,
				'howtos',
				'searchText',
				searchText,
				`Search "${searchText}"`
			);
		}
	};

	const showAllItems = () => {
		if (refSearchText.current !== null) {
			refSearchText.current.focus();
		}
		setItemsByIdCode('newestFirst');
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
				{howtos.length > 1 && searchText === '' && (
					<h2 className="title">{howtos.length} Howtos</h2>
				)}
				{howtos.length === 1 && searchText === '' && (
					<h2 className="title oneOfMany">
						1 of {initialItems.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{howtos.length === 0 && searchText !== '' && (
					<h2 className="title oneOfMany">
						0 of {initialItems.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{howtos.length > 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						{howtos.length} of {initialItems.length}{' '}
						<span
							className="itemTypeTitle"
							onClick={() => showAllItems()}
						>
							Howtos
						</span>
					</h2>
				)}
				{howtos.length === 1 && searchText !== '' && (
					<h2 className="title oneOfMany">
						1 of {initialItems.length}{' '}
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
						<input
							id="mainSearch"
							ref={refSearchText}
							placeholder="search howtos"
							type="text"
							value={searchText}
							className="form-control input-sm searchBox"
							onFocus={displaySearchResults}
							onChange={displaySearchResults}
						/>
					</div>
				</div>

				{/* ========== MULTIPLE RECORDS ========== */}
				{howtos.length > 1 && (
					<section className="howtos">
						{howtos.map((howto: any, i: number) => {
							return (
								<div key={i} className="overviewItem">
									<div className="header">
										<span className="createDate">
											{qdat.smartDateWithYear(
												howto.systemWhenCreated
											)}
										</span>{' '}
										<span className="category">
											{howto.categoryTitle}
										</span>
									</div>
									<div
										key={i}
										className="itemLinkTitle"
										onClick={() =>
											setCurrentItemsById(howto.id)
										}
									>
										{howto.title}
									</div>
								</div>
							);
						})}
					</section>
				)}

				{/* ========== ONE RECORD ========== */}
				{howtos.length === 1 && (
					<div className="item">
						<div className="header">
							<div>
								<span className="createDate">
									{qdat.smartDateWithYear(
										getCurrentItem().systemWhenCreated
									)}
								</span>{' '}
								<span className="category">
									{getCurrentItem().categoryTitle}
								</span>
							</div>
							<div className="headerRow">
								<div className="title">
									{getCurrentItem().title}
								</div>
							</div>
						</div>
						<div className="body">
							<div
								className="codeArea"
								dangerouslySetInnerHTML={{
									__html: convertBodyToBodyParsed(
										getCurrentItem()
									),
								}}
							/>
						</div>
						{getCurrentItem().jsfiddleUrl && (
							<div className="jsfiddleWrapper">
								<div className="title">jsfiddle:</div>
								<iframe
									title="JSFiddle"
									src={getCurrentItem().jsfiddleUrl}
									className="jsfiddle"
									width="100%"
									height="300"
								/>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default PageHowtos;

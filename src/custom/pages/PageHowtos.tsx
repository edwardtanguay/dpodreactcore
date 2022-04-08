/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import '../styles/page_howtos.scss';
import { IItemPageProps, IHowto } from '../models/interfaces';
import _initialHowtos from '../models/model_howtos';
import { Helmet } from 'react-helmet';
import * as qdat from '../../system/qtools/qdat';
import * as qstr from '../../system/qtools/qstr';

function PageHowtos(props: IItemPageProps) {
	const { id, searchText, idCode, loadItems, forceConsistentStateData } =
		props;
	const [items, setItems] = useState<IHowto[]>([]);
	const refSearchText = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setItems([...loadItems()]);
	}, [id, searchText, idCode]);

	useEffect(() => {
		if (refSearchText.current !== null && id === 0 && searchText === '' && idCode === '') {
			refSearchText.current.focus();
		}
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
						<input
							id="mainSearch"
							placeholder="search howtos"
							ref={refSearchText}
							type="text"
							value={searchText}
							className="form-control input-sm searchBox"
							onFocus={displaySearchResults}
							onChange={displaySearchResults}
						/>
					</div>
				</div>

				{/* ========== MULTIPLE RECORDS ========== */}
				{items.length > 1 && (
					<section className="howtos">
						{items.map((howto: any, i: number) => {
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
										onClick={() => displayOneItem(howto.id)}
									>
										{howto.title}
									</div>
								</div>
							);
						})}
					</section>
				)}

				{/* ========== ONE RECORD ========== */}
				{items.length === 1 && (
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

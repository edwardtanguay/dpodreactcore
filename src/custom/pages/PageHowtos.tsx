/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
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
	displayGroupIdCode: string,
	searchText: string,
	id: number
}

const getItems = (query: IItemsQueryObject) => {

	const { displayGroupIdCode, searchText, id } = query;

	if (displayGroupIdCode !== '') {
		switch (displayGroupIdCode) {
			case 'oldestFirst':
				return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'asc');
			case 'newestFirst':
			default:
				return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'desc');
		}
	}

	if (searchText !== '') {
		return initialHowtos.filter((howto: IHowto) => qstr.searchTextMatches(searchText, [howto.title, howto.body].join('|')));
	}

	if (id !== 0) {
		return initialHowtos.filter((howto: IHowto) => howto.id === id);
	}

}

const getDefaultItems = () => {
	const id: number = qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id'));
	if (id !== 0) {
		return getItems({ displayGroupIdCode: '', searchText: '', id });
	} else {
		const searchText = qsys.getParameterValueFromUrl('searchText');
		if (!qstr.isEmpty(searchText)) {
			return getItems({ displayGroupIdCode: '', searchText, id: 0 });
		} else {
			let displayGroupIdCode = qsys.getParameterValueFromUrl('displayGroupIdCode');
			if (qstr.isEmpty(displayGroupIdCode)) {
				displayGroupIdCode = 'newestFirst';
			}
			return getItems({ displayGroupIdCode, searchText: '', id: 0 });
		}
	}
}

const getItemsById = (id: number) => {
	return getItems({ displayGroupIdCode: '', searchText: '', id });
}

function PageHowtos() {
	const [howtos, setHowtos] = useState<IHowto[]>(getDefaultItems());
	const [pageTitle, setPageTitle] = useState<string>("");
	// const [searchText, setSearchText] = useState<string>("");

	const buildHowManyText = (totalItemsShowing: number) => {
		if (totalItemsShowing === howtos.length) {
			setPageTitle(`${totalItemsShowing} Howtos`);
		} else {
			setPageTitle(`${totalItemsShowing} of <a class="siteTitleLink" href="howtos">${howtos.length} Howtos</a>`);
		}
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
		buildHowManyText(1);
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}

	return (
		<>
			<Helmet>
				<title>Edward's how-to instructions and code examples</title>
				<meta name="description" content="How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Google Sheets, etc." />
			</Helmet>


			<div className="page page_howtos">
				<h2 className="title">{pageTitle}</h2>

				{/* ========== MULTIPLE RECORDS ========== */}
				{howtos.length > 1 && (
					<section className="howtos">
						{howtos.map((howto: any, i: number) => {
							return (
								<div key={i} onClick={() => setCurrentItemsById(howto.id)}>{howto.systemWhenCreated.substr(0, 10)} - {howto.title}</div>
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
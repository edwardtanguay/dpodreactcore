import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
// @ts-ignore
import { Helmet } from 'react-helmet';
import initialHowtos from '../models/model_howtos';
import { IHowto } from '../models/interfaces';
import * as qarr from '../../system/qtools/qarr';

const getSortedItems = (sortIdCode: string) => {
	switch (sortIdCode) {
		case 'newestFirst':
			return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'desc');
		case 'oldestFirst':
			return qarr.sortObjects(initialHowtos, 'systemWhenCreated', 'asc');
		default:
			return initialHowtos;
	}
}

function PageHowtos() {
	const [howtos, setHowtos] = useState<IHowto[]>(getSortedItems('newestFirst'));

	return (
		<>
			<Helmet>
				<title>Edward's how-to instructions and code examples</title>
				<meta name="description" content="How to get things done in JavaScript, React, Node, MongoDB, CSS, TypeScript, SQLite, Google Sheets, etc." />
			</Helmet>
			<div className="page page_howtos">
				<h2 className="title">{howtos.length} Howtos</h2>
				<section className="howtos">
					{howtos.map((howto: any, i: number) => {
						return (
							<div key={i}>{howto.systemWhenCreated.substr(0, 10)} - <a target="_blank" href={`https://onespace.netlify.app/howtos?id=${howto.id}`} rel="noreferrer">{howto.title}</a></div>
						)
					})}
				</section>
			</div>
		</>
	)
}

export default PageHowtos;
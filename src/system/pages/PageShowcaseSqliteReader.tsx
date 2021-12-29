/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_showcaseSqliteReader.scss';
import PageManager from '../classes/pageManager';

function PageShowcaseSqliteReader() {
	const pageIdCode = 'showcaseSqliteReader';
	const [records, setRecords] = useState([{}]);
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setRecords([...data.records]);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	return (
		<div className="page page_showcaseSqliteReader">
			<h2 className="title">Showcase: SQLite Reader</h2>
			<p className="description">An info page that displays showcase: SQLite reader</p>
			<div className="recordArea">
					{records.map((record: any, index: number) => (
						<p key={index}>{record.id} - {record.message}</p>
					))}
			</div>
		</div>
	)
}

export default PageShowcaseSqliteReader;
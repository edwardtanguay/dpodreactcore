/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_showcaseJsonReadWrite.scss';
import PageManager from '../classes/pageManager';

function PageShowcaseJsonReadWrite() {
	const pageIdCode = 'showcaseJsonReadWrite';
	const [records, setRecords] = useState([{}]);
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setRecords([...data.records]);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	const saveData = async () => {
		setRecords([...records.map((m: any) => {
			if (m.id === 10) {
				m.menu = 'CHANGED';
				m.title += '--added222';
			}
			return m;
		})]);

		const data = await pm.callAction('saveRecords', { records });
		if (!data.success) {
			throw new Error('fetch failed');
		}
	}

	return (
		<div className="page page_showcaseJsonReadWrite">
			<h2 className="title">Showcase: JSON Manager</h2>
			<p className="description">A page that reads and and writes to JSON files via the backend</p>
			<div className="controlPanel">
				<button className="saveDate" type="button" onClick={() => saveData()}>Save Data</button>
			</div>
			<div className="recordArea">
					{records.map((record: any, index: number) => (
						<p key={index}>{record.id} - {record.title}</p>
					))}
			</div>
		</div>
	)
}

export default PageShowcaseJsonReadWrite;
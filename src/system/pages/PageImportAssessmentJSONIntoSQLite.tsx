/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_importAssessmentJSONIntoSQLite.scss';
import PageManager from '../classes/pageManager';

function PageImportAssessmentJSONIntoSQLite() {
	const pageIdCode = 'importAssessmentJSONIntoSQLite';
	const [message, setMessage] = useState('');
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setMessage(data.message);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	const handleImportData = async (e:any) => {
		e.preventDefault();
		const data = await pm.callAction('importData');
		setMessage(data.message);
	}

	return (
		<div className="page page_importAssessmentJSONIntoSQLite">
			<h2 className="title">Import Assessment JSON into SQLite</h2>
			<p className="description">Read assessment flashcards out of JSON and import into SQLite file</p>
			<p className="message">{message}</p>

			<div className="importArea">
				<p>Source file: <code>src\system\data\json\curriculum_20111102.json</code></p>
				<p>Target file: <code>public\output\assessmentInfo.sqlite</code></p>
				<div className="buttonRow">
					<button onClick={handleImportData}>Import Data</button>
				</div>
			</div>
		</div>
	)
}

export default PageImportAssessmentJSONIntoSQLite;
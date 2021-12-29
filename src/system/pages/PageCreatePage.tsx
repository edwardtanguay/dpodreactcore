/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_createPage.scss';
import '../styles/dpodFormGeneric.scss';
import PageManager from '../classes/pageManager';

function PageCreatePage() {
	const pageIdCode = 'createPage';
	const [createPageTitle, setCreatePageTitle] = useState('');
	const [createPageKindIdCode, setCreatePageKindIdCode] = useState('pageWithSassFile');
	const [message, setMessage] = useState('');
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setMessage(data.message);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	const closeMessage = () => {
		setMessage('');
	}

	const changeCreatePageTitle = (e: any) => {
		setCreatePageTitle(e.target.value);
	}

	const changeCreatePageKindIdCode = (e: any) => {
		setCreatePageKindIdCode(e.target.value);
	}

	const createPage = async (e: any) => {
		e.preventDefault();
		const data = await pm.callAction('createPage', { createPageTitle, createPageKindIdCode });
		setMessage(data.message);
		if (data.info.error) {
			setMessage(data.info.error);
		} else {
			setMessage(data.message);
		}
		setCreatePageTitle('');
	}

	return (
		<div className="page page_createPage">
			<h2 className="title">Create Page</h2>
			<p className="description">Add a page to this website</p>
			<form className="dpodFormGeneric">
				{message !== '' && (
					<div className="message" onClick={() => closeMessage()} dangerouslySetInnerHTML={{ __html: message }}></div>
				)}
				<div className="field dataType_line">
					<label htmlFor="createPageTitle" className="fieldLabel">Page Title</label>
					<input id="createPageTitle" type="text" autoFocus value={createPageTitle} onChange={changeCreatePageTitle} />
					<div className="example">e.g. <code>Quarterly Reports</code></div>
				</div>
				<div className="field dataType_choice field_dataType_choice_radioButtons">
					<fieldset>
						<legend className="fieldLabel">Kind of Page</legend>
						<div className="radioChoice">
							<label>
								<input type="radio" className="radioControl" checked={createPageKindIdCode === 'pageWithSassFile'} value="pageWithSassFile" name="pageKindIdCode" onChange={e => changeCreatePageKindIdCode(e)} />
								<span className="title">page with SASS file</span>
								<span className="description">for simple pages that need no backend controller, don't load data from the backend, or that fetch data via the frontend</span>
							</label>
						</div>
						<div className="radioChoice">
							<label>
								<input type="radio" className="radioControl" value="pageWithSassFileAndController" name="pageKindIdCode" onChange={e => changeCreatePageKindIdCode(e)} />
								<span className="title">page with SASS file and controller</span>
								<span className="description">for pages for which you need a backend controller, e.g. to get data from your local system (for a local website app) or if you need to access a local database, etc.</span>
							</label>
						</div>
						<div className="radioChoice">
							<label>
								<input type="radio" className="radioControl" value="pageWithSassFileControllerAndJsonFile" name="pageKindIdCode" onChange={e => changeCreatePageKindIdCode(e)} />
								<span className="title">page with SASS file, controller and JSON file</span>
								<span className="description">for a page that will get its data from a local JSON file, good for local website apps where you modify the content of a JSON file which is then displayed on the page, or perhaps a JSON file that is exported from a database table, etc.</span>
							</label>
						</div>
					</fieldset>
				</div>
				<div className="buttonArea">
					<button className="submitButton" onClick={createPage}>Create Page</button>
				</div>
			</form>
		</div>
	)
}

export default PageCreatePage;
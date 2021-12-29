/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_generateMockData.scss';
import PageManager from '../classes/pageManager';
import { FaSpinner } from 'react-icons/fa';

function PageGenerateMockData() {
	const pageIdCode = 'generateMockData';
	const [showUserObjectsLoadingMessage, setShowUserObjectsLoadingMessage] = useState(false);
	const [userObjectsMessage, setUserObjectsMessage] = useState('');
	const [userObjectsTotal, setUserObjectsTotal] = useState(10);
	const pm = new PageManager(pageIdCode);

	const generateUsersJsonFile = () => {
		setUserObjectsMessage('');
		setShowUserObjectsLoadingMessage(true);
		setTimeout(() => {
			(async () => {
				const data = await pm.callAction('generateUsersJsonFile', {
					howMany: userObjectsTotal
				});
				setUserObjectsMessage(data.message);
				setShowUserObjectsLoadingMessage(false);
			})();
		}, 300)
	}

	const handleUsersNumberChange = (e: any) => {
		setUserObjectsTotal(e.target.value);
	}

	return (
		<div className="page page_generateMockData">
			<h2 className="title">Generate Mock Data</h2>
			<p className="description">An info page that displays generate mock data</p>
			<div className="exportItem">
				<h3>Generate JSON file with array of full user objects</h3>
				<div className="dpod_p workArea">
					<div className="buttonArea">
						<button className="dpod_button userObjectButton" onClick={() => generateUsersJsonFile()}>Generate file with {userObjectsTotal} users</button>
						<input type="range" min="1" max="100" onChange={handleUsersNumberChange} value={userObjectsTotal} />
					</div>
					{showUserObjectsLoadingMessage && (
						<div className="loadingMessage">
							<FaSpinner className="spinner" /> Generating file...<textarea></textarea>
						</div>
					)}
					<div dangerouslySetInnerHTML={{ __html: userObjectsMessage }}></div>
				</div>
			</div>

			<div className="infoArea dpod_labeledArea dpod_hide">
				<fieldset>
					<legend className="fieldLabel">Infos</legend>
					<ul>
						<li>Issue: nodemon restarts when JSON files are created</li>
						<li>Ok, it seems that only when a file is overwritten that nodemone restarts. And then node will restart as well (!).</li>
						<li>So one solution is to always create new files, e.g. with a random number in file name.</li>
						<li>Testing: delete file first, that seems to work.</li>
						<li>So, it turns out that if you delete the file first, then create it, the server won't reload.</li>
						<li>I left this Stack Overflow question to see if it resolves why writing to a file that is already there restarts both nodemon and node: <a href="https://stackoverflow.com/questions/69952574/nodemon-json-file-restarts-nodemon-regardless-of-watch-ignore-ext-settings" target="_blank" rel="noreferrer">How to get nodemon from restarting when JSON files are created</a></li>
					</ul>
				</fieldset>
			</div>


		</div>
	)
}

export default PageGenerateMockData;
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_showcaseMongooseCRUD.scss';
import PageManager from '../classes/pageManager';

function PageShowcaseMongooseCRUD() {
	const pageIdCode = 'showcaseMongooseCRUD';
	const [message, setMessage] = useState('');
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		setMessage(data.message);
	}

	useEffect(() => {
		loadPageData();
	}, []);

	return (
		<div className="page page_showcaseMongooseCRUD">
			<h2 className="title">Showcase: Mongoose CRUD</h2>
			<p className="description">An info page that displays showcase: Mongoose CRUD</p>
			<p className="message">{message}</p>
			<div className="infoArea dpod_labeledArea dpod_topSpace">
				<fieldset>
					<legend className="fieldLabel">Infos</legend>
					<ul>
						<li><a href="https://mongoosejs.com/docs/" target="_blank">Mongoose docs</a></li>
					</ul>
				</fieldset>
			</div>
		</div>
	)
}

export default PageShowcaseMongooseCRUD;
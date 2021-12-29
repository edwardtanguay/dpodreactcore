/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../styles/page_deletePage.scss';
import '../styles/dpodFormGeneric.scss';
import PageManager from '../classes/pageManager';
import { IPageItem } from '../dataLayer/interfaces';

function PageDeletePage() {
	const pageIdCode = 'deletePage';
	const [message, setMessage] = useState('');
	const [deletePageIdCode, setDeletePageIdCode] = useState('');
	const [pageItems, setPageItems] = useState<IPageItem[]>([]);
	const pm = new PageManager(pageIdCode);

	const loadPageData = async () => {
		const data = await pm.loadPageData();
		const { message, pageItems }: { message: string, pageItems: IPageItem[] } = data;
		setMessage(message);
		setPageItems([...pageItems]);
		if (pageItems.length > 0) {
			setDeletePageIdCode(pageItems[0].idCode);
		}
	}

	useEffect(() => {
		loadPageData();
	}, []);

	const deletePage = async () => {
		const data = await pm.callAction('deletePage', { deletePageIdCode });
		setMessage(data.message);
		setPageItems([...data.pageItems]);
	}

	const onPageIdCodeChange = (event: any) => {
		setDeletePageIdCode(event.target.value);
	}

	const closeMessage = () => {
		setMessage('');
	}

	return (
		<div className="page page_deletePage">
			<h2 className="title">Delete Page</h2>
			<p className="description">Delete a page from this website</p>
			<form className="dpodFormGeneric">
				{message !== '' && (
					<div className="message" onClick={() => closeMessage()} dangerouslySetInnerHTML={{ __html: message }}></div>
				)}
				<div className="field dataType_choice field_dataType_choice_dropdown">
					<label htmlFor="pageTitle" className="fieldLabel">Page to Delete</label>
					<select value={deletePageIdCode} onChange={e => onPageIdCodeChange(e)}>
						{pageItems.map((pageItem, index) => {
							return (
								<option value={pageItem.idCode}>{pageItem.title}</option>
							)
						})}
					</select>
				</div>
				<div className="buttonArea">
					<button className="submitButton" type="button" onClick={e => deletePage()}>Delete Page</button>
				</div>
			</form>
		</div>
	)
}

export default PageDeletePage;
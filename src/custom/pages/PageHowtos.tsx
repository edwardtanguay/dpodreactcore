/* eslint-disable react-hooks/exhaustive-deps */
// @ts-ignore
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
// import _initialItems from '../models/model_howtos';

interface IProps {
	getUrlId: any;
	getUrlSearchText: any;
	getUrlIdCode: any;
}

function PageHowtos(props: IProps) {
	const { getUrlId, getUrlSearchText, getUrlIdCode } = props;
	// const [items, setItems] = useState<IHowto[]>([]);
	const [id, setId] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [idCode, setIdCode] = useState('');

	const setInitialPageState = () => {
		const id2 = getUrlId();
		console.log(id2);
		setId(id2);
		setSearchText(getUrlSearchText());
		setIdCode(getUrlIdCode());
	};

	const forceCorrectPageStateAndFilterItems = () => {
		console.log(id);
		switch (true) {
			case id !== 0: {
				setSearchText('');
				setIdCode('');
				break;
			}
			case idCode !== '': {
				setId(0);
				setSearchText('');
				break;
			}
			case searchText !== '': {
				setId(0);
				setIdCode('');
				break;
			}
			default: {
				setId(0);
				setSearchText('');
				setIdCode('');
				break;
			}
		}
	};

	useEffect(() => {
		setInitialPageState();
	}, []);

	useEffect(() => {
		console.log('id has changed to: ' + id);
		forceCorrectPageStateAndFilterItems();
	}, [id]);

	return (
		<div className="page page_howtos">
			<h2>Testing</h2>
			<ul>
				<li>id: [{id}]</li>
				<li>searchText: [{searchText}]</li>
				<li>idCode: [{idCode}]</li>
			</ul>
		</div>
	);
}

export default PageHowtos;

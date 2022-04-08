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

	const forceConsistentStateData = (obj: any) => {
		obj.id = obj.id ?? 0;
		obj.searchText = obj.searchText ?? '';
		obj.idCode = obj.idCode ?? '';
		switch (true) {
			case obj.id !== 0: {
				obj.searchText = '';
				obj.idCode = '';
				break;
			}
			case obj.searchText !== '': {
				obj.id = 0;
				obj.idCode = '';
				break;
			}
			case obj.idCode !== '': {
				obj.id = 0;
				obj.searchText = '';
				break;
			}
			default: {
				obj.id = 0;
				obj.searchText = '';
				obj.idCode = '';
				break;
			}
		}
		setId(obj.id);
		setSearchText(obj.searchText);
		setIdCode(obj.idCode);
	};

	useEffect(() => {
		forceConsistentStateData({
			id: getUrlId(),
			searchText: getUrlSearchText(),
			idCode: getUrlIdCode(),
		});
	}, []);

	const handleClick = () => {
		forceConsistentStateData({ idCode: 'lesson002' });
	};

	return (
		<div className="page page_howtos">
			<h2>Testing</h2>
			<ul>
				<li>id: [{id}]</li>
				<li>searchText: [{searchText}]</li>
				<li>idCode: [{idCode}]</li>
			</ul>
			<button onClick={handleClick}>change</button>
		</div>
	);
}

export default PageHowtos;

/* eslint-disable react-hooks/exhaustive-deps */
// @ts-ignore
import { useState, useEffect } from 'react';
import '../styles/page_howtos.scss';
// import _initialItems from '../models/model_howtos';
import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';

const getUrlId = () => {
	return qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id'));
};

const getUrlSearchText = () => {
	return qsys.getParameterValueFromUrl('searchText');
};

const getUrlIdCode = () => {
	return qsys.getParameterValueFromUrl('idCode');
};

function PageHowtos() {
	// const { getUrlId, getUrlSearchText, getUrlIdCode } = props;
	// const [items, setItems] = useState<IHowto[]>([]);
	const [id, setId] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [idCode, setIdCode] = useState('');

	const setInitialPageState = () => {
		setId(getUrlId());
		setSearchText(getUrlSearchText());
		setIdCode(getUrlIdCode());
	};

	const filterItemsBasedOnPageState = () => {};

	useEffect(() => {
		setInitialPageState();
		filterItemsBasedOnPageState();
	}, []);

	useEffect(() => {
		filterItemsBasedOnPageState();
	}, [id, searchText, idCode]);

	return (
		<div className="page page_howtos">
			<h2>Testing</h2>
			<ul>
				<li>id: {id}</li>
				<li>searchText: {searchText}</li>
				<li>idCode: {idCode}</li>
			</ul>
		</div>
	);
}

export default PageHowtos;

import { useState, useEffect } from 'react';
import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';

export const itemPageManager = (Component: any) => (props: any) => {
	const [id, setId] = useState(0);
	const [searchText, setSearchText] = useState('');
	const [idCode, setIdCode] = useState('');

	const getUrlId = () => {
		return qstr.forceStringAsInteger(qsys.getParameterValueFromUrl('id'));
	};

	const getUrlSearchText = () => {
		return qsys.getParameterValueFromUrl('searchText');
	};

	const getUrlIdCode = () => {
		return qsys.getParameterValueFromUrl('idCode');
	};

	const forceConsistentStateData = (obj: any) => {

		//url variable
		let urlVariableName = '';
		let urlVariableValue = '';

		// get defaults
		obj.id = obj.id ?? 0;
		obj.searchText = obj.searchText ?? '';
		obj.idCode = obj.idCode ?? '';

		// force consistency between variables
		switch (true) {
			case obj.id !== 0: {
				obj.searchText = '';
				obj.idCode = '';
				urlVariableName = 'id';
				urlVariableValue = obj.id;
				break;
			}
			case obj.searchText !== '': {
				obj.id = 0;
				obj.idCode = '';
				urlVariableName = 'searchText';
				urlVariableValue = obj.searchText;
				break;
			}
			case obj.idCode !== '': {
				obj.id = 0;
				obj.searchText = '';
				urlVariableName = 'idCode';
				urlVariableValue = obj.idCode;
				break;
			}
			default: {
				obj.id = 0;
				obj.searchText = '';
				obj.idCode = '';
				break;
			}
		}

		// set state
		setId(obj.id);
		setSearchText(obj.searchText);
		setIdCode(obj.idCode);

		//update url
		qsys.changeBrowserState(
			document,
			'howtos',
			urlVariableName,
			urlVariableValue,
			`Edward's how-to instructions and code examples`
		);

	};

	useEffect(() => {
		forceConsistentStateData({
			id: getUrlId(),
			searchText: getUrlSearchText(),
			idCode: getUrlIdCode(),
		});
	}, []);

	return (
		<Component
			{...props}
			id={id}
			searchText={searchText}
			idCode={idCode}
			forceConsistentStateData={forceConsistentStateData}
		/>
	);
};

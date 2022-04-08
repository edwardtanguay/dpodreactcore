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

	return (
		<Component
			{...props}
			id={id}
			searchText={searchText}
			idCode={idCode}
			getUrlId={getUrlId}
			getUrlSearchText={getUrlSearchText}
			getUrlIdCode={getUrlIdCode}
			forceConsistentStateData={forceConsistentStateData}
		/>
	);
};

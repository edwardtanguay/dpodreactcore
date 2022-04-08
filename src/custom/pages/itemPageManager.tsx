import { useState, useEffect } from 'react';
import * as qstr from '../../system/qtools/qstr';
import * as qsys from '../../system/qtools/qsys';
import * as qarr from '../../system/qtools/qarr';
import { IItem } from '../models/interfaces';

export const itemPageManager =
	(
		Component: any,
		itemTypeIdCode: string,
		itemTypeSingleTitle: string,
		itemTypePluralTitle: string,
		itemTypeTabTitle: string
	) =>
	(props: any) => {
		const [id, setId] = useState(0);
		const [searchText, setSearchText] = useState('');
		const [idCode, setIdCode] = useState('');

		const getUrlId = () => {
			return qstr.forceStringAsInteger(
				qsys.getParameterValueFromUrl('id')
			);
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
			let tabTitle = '';

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
					tabTitle = `${itemTypeSingleTitle}: ${obj.id}`;
					break;
				}
				case obj.searchText !== '': {
					obj.id = 0;
					obj.idCode = '';
					urlVariableName = 'searchText';
					urlVariableValue = obj.searchText;
					tabTitle = `${itemTypePluralTitle}: "${obj.searchText}"`;
					break;
				}
				case obj.idCode !== '': {
					obj.id = 0;
					obj.searchText = '';
					urlVariableName = 'idCode';
					urlVariableValue = obj.idCode;
					tabTitle = `${itemTypeIdCode}: ${obj.idCode}`;
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
				itemTypeIdCode,
				urlVariableName,
				urlVariableValue,
				tabTitle
			);
		};

		useEffect(() => {
			forceConsistentStateData({
				id: getUrlId(),
				searchText: getUrlSearchText(),
				idCode: getUrlIdCode(),
			});
		}, []);

		const loadItems = (_initialItems: any[]) => {
			switch (true) {
				case id !== 0: {
					return _initialItems.filter(
						(item: IItem) => item.id === id
					);
				}
				case searchText !== '': {
					const items = _initialItems.filter((item: IItem) =>
						qstr.searchTextMatches(
							searchText,
							[item.bulkSearch].join('|')
						)
					);
					return qarr.sortObjects(items, 'systemWhenCreated', 'desc');
				}

				case idCode !== '': {
					switch (idCode) {
						case 'oldestFirst':
							const items = [..._initialItems];
							return qarr.sortObjects(
								items,
								'systemWhenCreated',
								'asc'
							);
						case 'newestFirst':
						default:
							return qarr.sortObjects(
								_initialItems,
								'systemWhenCreated',
								'desc'
							);
					}
				}

				default: {
					return qarr.sortObjects(
						_initialItems,
						'systemWhenCreated',
						'desc'
					);
				}
			}
		};
		return (
			<Component
				{...props}
				id={id}
				searchText={searchText}
				idCode={idCode}
				forceConsistentStateData={forceConsistentStateData}
				loadItems={loadItems}
			/>
		);
	};

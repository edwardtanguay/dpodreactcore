import { useState, useEffect } from 'react';
import * as qstr from '../../../system/qtools/qstr';
import * as qsys from '../../../system/qtools/qsys';
import * as qarr from '../../../system/qtools/qarr';
import { IItem } from '../../models/interfaces';

interface ICodeGroup {
	idCode: string;
	title: string;
	getItems: any;
}

export const itemPageManager =
	(
		Component: any,
		_initialItems: IItem[],
		itemTypeIdCode: string,
		itemTypePluralTitle: string,
		itemTypeTabMainTitle: string,
		singleItemTab: any,
		customIdCodeGroups: ICodeGroup[]
	) =>
	(props: any) => {
		const [id, setId] = useState(0);
		const [searchText, setSearchText] = useState('');
		const [idCode, setIdCode] = useState('');

		const idCodeGroups: ICodeGroup[] = [
			{
				idCode: 'oldestFirst',
				title: 'Oldest First',
				getItems: (items: IItem[]) =>
					qarr.sortObjects(items, 'systemWhenCreated', 'asc'),
			},
			{
				idCode: 'firstTen',
				title: 'First Ten',
				getItems: (items: IItem[]) =>
					qarr
						.sortObjects(items, 'systemWhenCreated', 'asc')
						.slice(0, 10),
			},
			...customIdCodeGroups,
		];

		const getIdCodeGroup = (idCode: string, items: IItem[]) => {
			const idCodeGroup = idCodeGroups.find((m) => m.idCode === idCode);
			if (idCodeGroup !== undefined) {
				return idCodeGroup.getItems(items);
			} else {
				return [];
			}
		};

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
			obj.itemType = obj.itemTitle ?? '';
			obj.keepSearchText = obj.keepSearchText ?? false;

			// force consistency between variables
			switch (true) {
				case obj.id !== 0: {
					const item = (_initialItems as IItem[]).find(
						(m) => m.id === obj.id
					);
					obj.searchText = '';
					obj.idCode = '';
					urlVariableName = 'id';
					urlVariableValue = obj.id;
					if (item) {
						tabTitle = singleItemTab((item as IItem).title);
					} else {
						tabTitle = 'item not found';
					}
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
					tabTitle = `${itemTypePluralTitle}: ${obj.idCode}`;
					break;
				}
				default: {
					obj.id = 0;
					obj.searchText = '';
					obj.idCode = '';
					tabTitle = itemTypeTabMainTitle;
					break;
				}
			}

			// set state
			setId(obj.id);
			if (!obj.keepSearchText) {
				setSearchText(obj.searchText);
			}
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

		const loadItems = () => {
			switch (true) {
				case id !== 0: {
					return (_initialItems as IItem[]).filter(
						(item: IItem) => item.id === id
					);
				}
				case searchText !== '': {
					const items = (_initialItems as IItem[]).filter(
						(item: IItem) =>
							qstr.searchTextMatches(
								searchText,
								item.bulkSearch
							)
					);
					let titleMatchItems: IItem[] = [];
					let otherMatchItems: IItem[] = [];
					items.forEach(item => {
						if (qstr.searchTextMatches(searchText, item.title)) {
							item.highlightedTitle = `HIGHLIGHTED: ${item.title}`;
							titleMatchItems.push(item);
						} else {
							item.highlightedTitle = item.title;
							otherMatchItems.push(item);
						}
					});
					
					titleMatchItems = qarr.sortObjects(titleMatchItems, 'systemWhenCreated', 'desc');
					otherMatchItems = qarr.sortObjects(otherMatchItems, 'systemWhenCreated', 'desc');

					return titleMatchItems.concat(otherMatchItems);
				}

				case idCode !== '': {
					return getIdCodeGroup(idCode, _initialItems);
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
				getUrlId={getUrlId}
				getUrlSearchText={getUrlSearchText}
				getUrlIdCode={getUrlIdCode}
			/>
		);
	};

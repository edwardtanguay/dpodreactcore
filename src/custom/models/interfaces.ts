export interface IHowto {
	id: number;
	category: string;
	title: string;
	body: string;
	jsfiddleUrl: string;
	bulkSearch: string;
	highlightedTitle: string;
	highlightedCategory: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
}

export interface IItem {
	id: number;
	category: string;
	title: string;
	highlightedTitle: string;
	highlightedCategory: string;
	bulkSearch: string;
}

export interface IItemsQueryObject {
	idCode: string,
	searchText: string,
	id: number
}

export interface IItemPageProps {
	id: number;
	searchText: string;
	idCode: string;
	getUrlId: any;
	getUrlSearchText: any;
	getUrlIdCode: any;
	forceConsistentStateData: any;
	loadItems: any;
}

export interface IFlashcard {
	id: number;
	category: string;
	front: string;
	back: string;
	title: string;
	highlightedTitle: string;
	highlightedCategory: string;
	bulkSearch: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
}

export interface ITechBook {
	id: number;
	idCode: string;
	title: string;
	category: string;
	description: string;
	notes: string;
	yearMonth: string;
	rank: number;
	language: string;
	extras: string;
	bulkSearch: string;
	highlightedTitle: string;
	highlightedCategory: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
}
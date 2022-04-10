export interface IHowto {
	id: number;
	categoryTitle: string;
	title: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
	body: string;
	jsfiddleUrl: string;
	bulkSearch: string;
	highlightedTitle: string;
}

export interface IItem {
	id: number;
	title: string;
	highlightedTitle: string;
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
	front: string;
	back: string;
	title: string;
	highlightedTitle: string;
	bulkSearch: string;
}
export interface IHowto {
	id: number;
	categoryTitle: string;
	title: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
	body: string;
	jsfiddleUrl: string;
}

export interface IItemsQueryObject {
	idCode: string,
	searchText: string,
	id: number
}

export interface IItemPageProps {
	getUrlId: any
}


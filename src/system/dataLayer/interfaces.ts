export interface IItem {
	id: number;
	systemWhenCreated: string;
	systemWhoCreated: string;
}

export interface IPageItem extends IItem {
	idCode: string;
	title: string;
}

export interface IShowcaseReport extends IItem {
	id: number;
	title: string;
	description: string;
	systemWhenCreated: string;
	systemWhoCreated: string;
}
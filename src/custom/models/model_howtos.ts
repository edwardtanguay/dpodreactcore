import rawHowtos from '../data/json/itemType_howtos.json';
import { IHowto } from '../models/interfaces';

const getHowtos = () => {
	const howtos: IHowto[] = [];
	rawHowtos.forEach((rawHowto: any) => {
		const howto: IHowto = {
			id: rawHowto.id,
			title: rawHowto.title,
			body: rawHowto.body,
			category: rawHowto.category,
			systemWhenCreated: rawHowto.systemWhenCreated,
			systemWhoCreated: rawHowto.systemWhoCreated,
			jsfiddleUrl: '',
			bulkSearch: `${rawHowto.title}|${rawHowto.body}`,
			highlightedTitle: rawHowto.title,
			highlightedCategory: rawHowto.category
		}
		howtos.push(howto);
	});

	return howtos;
}

export default getHowtos();
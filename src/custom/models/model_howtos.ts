import rawHowtos from '../data/json/rawHowtos.json';
import { IHowto } from '../models/interfaces';


const getHowtos = () => {
	const howtos: IHowto[] = [];
	rawHowtos.forEach((rawHowto: any) => {
		const howto: IHowto = {
			id: rawHowto.id,
			title: rawHowto.title,
			body: rawHowto.body,
			categoryTitle: rawHowto.category,
			systemWhenCreated: rawHowto.systemWhenCreated,
			systemWhoCreated: rawHowto.systemWhoCreated,
			jsfiddleUrl: '',
			bulkSearch: `${rawHowto.title}|${rawHowto.body}`,
			highlightedTitle: ''
		}
		howtos.push(howto);
	});

	return howtos;
}


// export const howtos = getHowtos();
export default getHowtos();
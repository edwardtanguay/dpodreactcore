import rawTechBooks from '../data/json/itemType_techBooks.json';
import { ITechBook } from './interfaces';

const getTechBooks = () => {
	const techBooks: ITechBook[] = [];
	rawTechBooks.forEach((rawTechBook: any) => {
		const techBook: ITechBook = {
			id: rawTechBook.id,
			idCode: rawTechBook.idCode,
			category: 'tech',
			title: rawTechBook.title,
			description: rawTechBook.description,
			notes: rawTechBook.notes,
			year: rawTechBook.year,
			rank: rawTechBook.rank,
			language: rawTechBook.language,
			extras: rawTechBook.extras,
			highlightedTitle: rawTechBook.title,
			highlightedCategory: 'tech',
			systemWhenCreated: rawTechBook.systemWhenCreated,
			systemWhoCreated: rawTechBook.systemWhoCreated,
			bulkSearch: `${rawTechBook.title}|${rawTechBook.description}|${rawTechBook.notes}`,
		}
		techBooks.push(techBook);
	});

	return techBooks;
}

export default getTechBooks();
import rawFlashcards from '../data/json/itemType_flashcards.json';
import { IFlashcard } from './interfaces';

const getFlashcards = () => {
	const flashcards: IFlashcard[] = [];
	rawFlashcards.forEach((rawFlashcard: any) => {
		const flashcard: IFlashcard = {
			id: rawFlashcard.id,
			front: rawFlashcard.front,
			back: rawFlashcard.back,
			title: rawFlashcard.title,
			highlightedTitle: rawFlashcard.highlightedTitle,
			bulkSearch: rawFlashcard.bulkSearch
		}
		flashcards.push(flashcard);
	});

	return flashcards;
}

export default getFlashcards();
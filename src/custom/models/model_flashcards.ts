import rawFlashcards from '../data/json/itemType_flashcards.json';
import { IFlashcard } from './interfaces';

const getFlashcards = () => {
	const flashcards: IFlashcard[] = [];
	rawFlashcards.forEach((rawFlashcard: any) => {
		const flashcard: IFlashcard = {
			id: rawFlashcard.id,
			category: rawFlashcard.category,
			front: rawFlashcard.front,
			back: rawFlashcard.back,
			title: rawFlashcard.front,
			bulkSearch: `${rawFlashcard.front}|${rawFlashcard.back}`,
			highlightedTitle: '',
			systemWhenCreated: rawFlashcard.systemWhenCreated,
			systemWhoCreated: rawFlashcard.systemWhoCreated
		}
		flashcards.push(flashcard);
	});

	return flashcards;
}

export default getFlashcards();
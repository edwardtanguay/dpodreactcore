/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import * as qstr from '../qtools/qstr';

interface IFlashcard {
	front: string;
	back: string;
}

class ControllerCurriculumFlashcardParser extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		this.response.send({
			defaultText: `- What is the capital of England?
  - London

- What is the capital of France?
  - Paris`
		});
	}

	action_parseText() {
		const sourceText = this.getValue('sourceText');
		const flashcards = this.parseToFlashcards(sourceText);
		let targetText = '';
		flashcards.forEach((flashcard: IFlashcard, index: number) => {
			targetText += `{
	"front": "${flashcard.front}",
	"back": "${flashcard.back}"
}`
			if (index < flashcards.length - 1) {
				targetText += `,${qstr.NEW_LINE()}`;
			}
		});
		this.response.send({
			targetText
		});
	}

	parseToFlashcards(text: string) {
		const flashcards: IFlashcard[] = [];
		const lines = qstr.convertStringBlockToLines(text);
		let front = '';
		let back = '';
		let count = 1;
		lines.forEach(line => {
			switch (count) {
				case 1:
					front = line;
					break;
				case 2:
					back = line;
					this.addFlashcard(flashcards, front, back);
					count = 0;
					break;
			}
			count++;
		});
		// this.addFlashcard(flashcards, front, back);
		return flashcards;

	}
	addFlashcard(flashcards: IFlashcard[], front: string, back: string) {
		front = qstr.replaceAll(front, "\"", '\\"');
		back = qstr.replaceAll(back, '"', '\\"');
		front = qstr.chopLeft(front, '- ').trim();
		back = qstr.chopLeft(back, '- ').trim();
		flashcards.push({
			front,
			back
		});
	}
}

export default ControllerCurriculumFlashcardParser;

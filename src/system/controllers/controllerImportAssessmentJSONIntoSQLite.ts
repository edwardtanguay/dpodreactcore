/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import fs from 'fs';
import SqliteManager from '../classes/sqliteManager';
import * as qstr from '../qtools/qstr';

class ControllerImportAssessmentJSONIntoSQLite extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		this.response.send({
			message: 'Press button to import data.'
		});
	}

	action_importData() {
		fs.readFile('./src/system/data/json/curriculum_20111102.json', 'utf-8', (err: any, res: any) => {
			const data = JSON.parse(res);
			const modules = data.modules;
			const importFlashcards: any = [];
			modules.forEach((module: any) => {
				if (module.title === '5. Backend') {
					const submodules = module.submodules;
					submodules.forEach((submodule: any) => {
						if (submodule.title.startsWith('5.01') || submodule.title.startsWith('5.02')) {
							const flashcards = submodule.flashcards;
							flashcards.forEach((flashcard: any) => {
								importFlashcards.push({
									front: flashcard.front,
									back: flashcard.back
								});
							});
						}
					});
				}
			});
			// this.createDatabase();
			this.saveFlashcardsToSqliteFile(importFlashcards);
		});
	}

	createDatabase() {
		const sqm = new SqliteManager('./public/output/assessmentData.sqlite');
		sqm.createDatabase(() => {
			sqm.executeSql(`CREATE TABLE "flashcards" ("id" INTEGER NOT NULL UNIQUE, "front" TEXT, "back" TEXT, PRIMARY KEY("id" AUTOINCREMENT))`);
			this.response.send({
				message: 'Database created.'
			});
		});
	}

	saveFlashcardsToSqliteFile(flashcards: any) {
		const sqm = new SqliteManager('./public/output/assessmentData.sqlite');

		flashcards.forEach((flashcard: any) => {
			const front = this.protect(flashcard.front);
			const back = flashcard.back;
			const sql = `INSERT INTO flashcards (front, back) VALUES ("${front}", "${this.protect(back)}")`;
			sqm.executeSql(sql);
		});
		this.response.send({
			message: 'Database created.'
		});
	}

	protect(text: string) {
		return qstr.replaceAll(text, '"', '""');
	}
}

export default ControllerImportAssessmentJSONIntoSQLite;

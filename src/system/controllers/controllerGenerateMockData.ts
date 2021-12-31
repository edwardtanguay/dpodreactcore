/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import * as faker from 'faker';
import * as fs from 'fs';
import * as qstr from '../../system/qtools/qstr';

const removeAccents = require('remove-accents');

class ControllerGenerateMockData extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_generateUsersJsonFile() {
		const howMany = this.getValue('howMany');
		const users: any[] = [];
		for (let x = 1; x <= howMany; x++) {
			const user = faker.helpers.createCard();
			this.standardizeUser(user);
			users.push(user);
		}
		const filePath = './public/output/json';
		const fileName = 'users.json';
		const physicalFilePathAndFileName = `${filePath}/${fileName}`;

		if (fs.existsSync(physicalFilePathAndFileName)) {
			fs.unlinkSync(physicalFilePathAndFileName);
		}
		const theJson = JSON.stringify(users, null, 4);
		fs.writeFile(physicalFilePathAndFileName, theJson, (err: any) => {
			if (err) {
				this.response.status(417).json({
					message: "error occurred, file not created",
					success: false
				});
			} else {
				this.response.status(201).json({
					message: `<div class="message">Download file with ${howMany} users: <code><a href="output/json/${fileName}" target="_blank">${fileName}</a></code></div><textarea spellCheck="false">${theJson}</textarea>`,
					success: true
				});
			}
		});
	}

	standardizeUser(user: any) {
		// name "Benedikt Denner", "Hr. Nikolas Krippner", "Lennie Plautz DDS"
		let cleanName: string = user.name;
		cleanName = qstr.replaceAll(cleanName, '.', '');
		cleanName = removeAccents(cleanName);
		const parts = qstr.breakIntoParts(cleanName, ' ');
		// username
		user.username = parts.join('_').toLowerCase();
		// email
		const emailParts = qstr.breakIntoParts(user.email, '@');
		user.email = `${user.username}@${emailParts[1]}`;
	}
}

export default ControllerGenerateMockData;

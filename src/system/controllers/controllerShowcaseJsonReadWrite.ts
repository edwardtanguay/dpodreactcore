/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import fs from 'fs';

class ControllerShowcaseJsonReadWrite extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		fs.readFile('./src/system/data/json/itemType_pageItems.json', 'utf-8', (err: any, rawData: any) => {
			const data = JSON.parse(rawData);
			this.response.send({
				records: data
			});
		});
	}

	action_saveRecords() {
		const { records } = this.request.body;
		fs.writeFile('./src/system/data/json/itemType_pageItems.json', JSON.stringify(records), (err: any) => {
			if (err) throw err;
			this.response.status(201).json({
				success: true
			});
		});
	}

}

export default ControllerShowcaseJsonReadWrite;
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import * as mongoose from 'mongoose';

class ControllerShowcaseMongooseCRUD extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {

		(async () => {
			await mongoose.connect('mongodb://localhost:27017/api001');
		})();

		this.response.send({
			message: 'Welcome to this page.'
		});
	}

}

export default ControllerShowcaseMongooseCRUD;

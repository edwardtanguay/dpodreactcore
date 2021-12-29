/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const mongoConnectString = process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient(mongoConnectString);

const getData = async (callback: any) => {
	await client.connect();
	const db = client.db('northwind');
	callback(db);
}

class ControllerShowcaseMongoDBDriverCRUD extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		getData(async (db: any) => {
			const products = await db.collection('products').find({ ProductName: /and/i })
				.project({
					ProductID: 1,
					SupplierID: 1,
					ProductName: 1,
					_id: 0
				}).toArray();
			this.response.send({
				products 
			});
		});
	}

}

export default ControllerShowcaseMongoDBDriverCRUD;
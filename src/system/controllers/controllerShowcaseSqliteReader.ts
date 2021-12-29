import Controller from './controller';
import SqliteManager from '../classes/sqliteManager';

class ControllerShowcaseSqliteReader extends Controller {

	async action_loadPageData() {
		const sqliteManager = new SqliteManager('./src/system/data/main.sqlite');
		const records = await sqliteManager.getRecordsWithSql(`SELECT * FROM messages`);
		try {
			this.response.send({ records });
		}
		catch (e:any) {
			throw new Error(e.message);
		}
	}
}

export default ControllerShowcaseSqliteReader;
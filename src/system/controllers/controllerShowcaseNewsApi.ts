/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
const NewsAPI = require('newsapi');

class ControllerShowcaseNewsApi extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	async action_loadPageData() {
		const newsapi = new NewsAPI('34c534a3b60d46ed81a257c952fbb3da');
		const data = await newsapi.v2.topHeadlines({
			language: 'de'
		});
			this.response.send({ ...data });
	}
}

export default ControllerShowcaseNewsApi;
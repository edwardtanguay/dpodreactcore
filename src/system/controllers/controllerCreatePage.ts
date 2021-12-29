/* eslint-disable @typescript-eslint/no-useless-constructor */
import DpodSiteBuilder from '../classes/dpodSiteBuilder';
import Controller from './controller';

class ControllerCreatePage extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		this.response.send({
			message: ''
		});
	}

	action_createPage() {
		const { createPageTitle, createPageKindIdCode } = this.requestData;
		const dpodSiteBuilder = new DpodSiteBuilder(createPageTitle, createPageKindIdCode);
		dpodSiteBuilder.createPage();
		this.response.send({
			message: '', 
			createPageTitle,
			info: dpodSiteBuilder.getInfo()
		});
	}
}

export default ControllerCreatePage;

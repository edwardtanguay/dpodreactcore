/* eslint-disable @typescript-eslint/no-useless-constructor */
import DpodSiteBuilder from '../classes/dpodSiteBuilder';
import Controller from './controller';
import * as dpod from '../dataLayer/dpod';
import { IPageItem } from '../dataLayer/interfaces';

class ControllerDeletePage extends Controller {

	private pageItems: IPageItem[] = [];

	constructor(request: any, response: any) {
		super(request, response);
		this.pageItems = dpod.getPageItems();
	}

	action_loadPageData() {
		this.response.send({
			message: '',
			pageItems: this.pageItems
		});
	}

	action_deletePage() {
		const { deletePageIdCode } = this.requestData;
		const dpodSiteBuilder = new DpodSiteBuilder(deletePageIdCode);
		dpodSiteBuilder.deletePage();
		this.response.send({
			message: '',
			pageItems: dpod.getPageItems()
		});
	}
}

export default ControllerDeletePage;

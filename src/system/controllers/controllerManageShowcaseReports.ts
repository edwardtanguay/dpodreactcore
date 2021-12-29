/* eslint-disable @typescript-eslint/no-useless-constructor */
import Controller from './controller';
import * as dpod from '../dataLayer/dpod';

class ControllerManageShowcaseReports extends Controller {

	constructor(request: any, response: any) {
		super(request, response);
	}

	action_loadPageData() {
		(async () => {
			const showcaseReports = await dpod.getShowcaseReports();
			const showcaseReport = await dpod.getShowcaseReport('id = 4');
			this.response.send({
				showcaseReportItemObject: showcaseReport.getItemObject(),
				showcaseReportObjects: showcaseReports.getAsItemObjects()
			});
		})();
	}

}

export default ControllerManageShowcaseReports;

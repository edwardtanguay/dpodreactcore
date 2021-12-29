class Controller {

	protected request: any;
	protected response: any;
	protected actionMethodName: string;
	protected action: string;
	protected requestData: any;

	constructor(request: any, response: any) {
		this.request = request;
		this.response = response;
		this.requestData = this.request.body;
		this.action = this.requestData.action;
		this.actionMethodName = 'action_' + this.action;
	}

	process() {
		(this as any)[this.actionMethodName]();
	}

	getValue(idCode: string) {
		return this.requestData[idCode];
	}
}

export default Controller;
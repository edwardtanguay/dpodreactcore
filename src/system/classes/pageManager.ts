import * as config from '../config';
import * as qstr from '../qtools/qstr';
const backendPort = config.getBackendPort();

class PageManager {

	private pageIdCode = '';
	private pageIdCodePascal = '';
	private backendBaseUrlPath = '';

	constructor(pageIdCode: string) {
		this.pageIdCode = pageIdCode;
		this.pageIdCodePascal = qstr.forcePascalNotation(this.pageIdCode);
		this.backendBaseUrlPath = `http://localhost:${backendPort}/`;
	}

	getBackendBaseUrlPath() {
		return this.backendBaseUrlPath;
	}

	async callAction(action: string, additionalData = {}): Promise<any> {
		const baseData = {
			action
		};
		const requestData = Object.assign(baseData, additionalData);
		return new Promise(resolve => {
			(async () => {
				const response = await fetch(`${this.backendBaseUrlPath}controller${this.pageIdCodePascal}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(requestData)
				});
				const data = await response.json();
				resolve(data);
			})();
		});
	}

	async loadPageData(additionalData = {}): Promise<any> {
		return new Promise(resolve => {
			resolve(this.callAction('loadPageData', additionalData));
		});
	}
}

export default PageManager;
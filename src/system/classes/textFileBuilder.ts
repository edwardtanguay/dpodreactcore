import * as qstr from '../qtools/qstr';

const fs = require('fs');

class TextFileBuilder {

	public data: any = {};
	private fileTemplateIdCode: string = '';
	private fileTemplatePathAndFileName: string = '';
	private content: string = '';
	private parsedContent: string = '';

	constructor(fileTemplateIdCode: string) {
		this.fileTemplateIdCode = fileTemplateIdCode;
		this.fileTemplatePathAndFileName = `src/system/fileTemplates/fileTemplate_${this.fileTemplateIdCode}.txt`;
		this.content = fs.readFileSync(this.fileTemplatePathAndFileName, 'utf8');
	}

	parseTheContent() {
		this.parsedContent = this.content;
		// eslint-disable-next-line guard-for-in
		for (const key in this.data) {
			const value = this.data[key];
			const marker = `@@${key}`;
			this.parsedContent = qstr.replaceAll(this.parsedContent, marker, value);
		}
	}

	buildNow(pathAndFileName: string) {
		this.parseTheContent();
		fs.writeFileSync(pathAndFileName, this.parsedContent);
	}

	log(line: string) {
		// eslint-disable-next-line no-console
		console.log(`>>> ${line}`);
	}
}

export default TextFileBuilder;
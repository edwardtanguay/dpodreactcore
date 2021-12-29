import TextFileBuilder from './textFileBuilder';
import * as qstr from '../qtools/qstr';
import * as qfil from '../qtools/qfil';
import DynamicFile from './dynamicFile';

class DpodSiteBuilder {

	private pageTitle: string = '';
	private pageKindIdCode: string = '';
	private info: any = {};
	private data: any = {};

	constructor(pageTitle: string, pageKindIdCode: string = '', info: any = {}) {
		this.pageTitle = pageTitle;
		this.pageKindIdCode = pageKindIdCode;
		this.info = info;
	}

	getPageComponentPathAndFileName(pascalNotation: string) {
		return `src/system/pages/Page${pascalNotation}.tsx`;
	}

	getPageStylesheetPathAndFileName(camelNotation: string) {
		return `src/system/styles/page_${camelNotation}.scss`;
	}

	getPageContollerPathAndFileName(pascalNotation: string) {
		return `src/system/controllers/controller${pascalNotation}.ts`;
	}

	getSitePathAndFileName() {
		return '../Site.tsx';
	}

	getContollerFactoryPathAndFileName() {
		return `../factories/controllerFactory.ts`;
	}

	getJsonDataPathAndFileName(camelNotation: string) {
		return `src/system/data/json/pageData_${camelNotation}.json`;
	}

	buildBaseControllerFunctionality(pageId: string) {
		const controllerTemplateIdCode = `newPage${pageId}Controller`;

		// build controller
		const textFileBuilderController = new TextFileBuilder(controllerTemplateIdCode);
		textFileBuilderController.data = this.data;
		textFileBuilderController.buildNow(this.getPageContollerPathAndFileName(this.data.pagePascal));

		// make modifications in the controllerFactory.ts file
		const controllerFactoryDynamicFile = new DynamicFile(this.getContollerFactoryPathAndFileName());
		controllerFactoryDynamicFile.addCodeChunkToCodeArea('loadClasses', this.data.pageCamel, `import Controller${this.data.pagePascal} from '../controllers/controller${this.data.pagePascal}';`);
		controllerFactoryDynamicFile.addCodeChunkToCodeArea('switchBlock', this.data.pageCamel,
			[
				`case 'controller${this.data.pagePascal}':`,
				`return new Controller${this.data.pagePascal}(request, response);`
			]
		);
		controllerFactoryDynamicFile.save();

	}

	buildBasePageFunctionality(pageId: string) {
		const componentTemplateIdCode = `newPage${pageId}Component`;
		const styleshheetTemplateIdCode = `newPage${pageId}Stylesheet`;
		const pageSyntaxVariations = qstr.getTermSyntaxVariations(this.pageTitle, 'page');
		this.data = {
			...pageSyntaxVariations
		};
		// main display page
		const textFileBuilder = new TextFileBuilder(componentTemplateIdCode);
		textFileBuilder.data = this.data;
		textFileBuilder.buildNow(this.getPageComponentPathAndFileName(this.data.pagePascal));

		// stylesheet
		const textFileBuilderStylesheet = new TextFileBuilder(styleshheetTemplateIdCode);
		textFileBuilderStylesheet.data = this.data;
		// TODO: create enums on data
		textFileBuilderStylesheet.buildNow(this.getPageStylesheetPathAndFileName(this.data.pageCamel));

		// make modifications in the Site.tsx file
		const siteDynamicFile = new DynamicFile(this.getSitePathAndFileName());
		siteDynamicFile.addCodeChunkToCodeArea('loadPageComponentLines', this.data.pageCamel, `import Page${this.data.pagePascal} from './pages/Page${this.data.pagePascal}';`);
		siteDynamicFile.addCodeChunkToCodeArea('linkPageComponentLines', this.data.pageCamel, `<span><Link to='/${this.data.pageCamel}'>${this.pageTitle}</Link></span>`);
		siteDynamicFile.addCodeChunkToCodeArea('routePageComponentLines', this.data.pageCamel, `<Route path='/${this.data.pageCamel}'><Page${this.data.pagePascal} /></Route>`);
		siteDynamicFile.save();
	}

	createPage() {
		switch (this.pageKindIdCode) {
			case 'pageWithSassFile':
				this.buildBasePageFunctionality('1');
				break;
			case 'pageWithSassFileAndController':
				this.buildBasePageFunctionality('2');
				this.buildBaseControllerFunctionality('2');
				break;
			case 'pageWithSassFileControllerAndJsonFile':
				this.buildBasePageFunctionality('3');
				this.buildBaseControllerFunctionality('3');

				//create JSON file
				const textFileBuilderJsonDataFile = new TextFileBuilder('newPage3Json');
				textFileBuilderJsonDataFile.data = this.data;
				//src\system\data\json\pageData_test111.json
				textFileBuilderJsonDataFile.buildNow(this.getJsonDataPathAndFileName(this.data.pageCamel));
				break;
		}
	}

	getInfo() {
		return this.info;
	}

	deletePage() {
		const pageSyntaxVariations = qstr.getTermSyntaxVariations(this.pageTitle, 'page');
		this.data = {
			...pageSyntaxVariations
		};

		// delete main display page
		qfil.deleteFile(this.getPageComponentPathAndFileName(this.data.pagePascal));

		// delete stylesheet
		qfil.deleteFile(this.getPageStylesheetPathAndFileName(this.data.pageCamel));

		// delete controller (if there is one)
		qfil.deleteFile(this.getPageContollerPathAndFileName(this.data.pagePascal));

		// delete entries made in the Site.tsx file
		const siteDynamicFile = new DynamicFile(this.getSitePathAndFileName());
		siteDynamicFile.deleteCodeChunkFromCodeArea('loadPageComponentLines', this.data.pageCamel);
		siteDynamicFile.deleteCodeChunkFromCodeArea('linkPageComponentLines', this.data.pageCamel);
		siteDynamicFile.deleteCodeChunkFromCodeArea('routePageComponentLines', this.data.pageCamel);
		siteDynamicFile.save();

		// delete entries made in the controller factory
		const controllerFactoryDynamicFile = new DynamicFile(this.getContollerFactoryPathAndFileName());
		controllerFactoryDynamicFile.deleteCodeChunkFromCodeArea('loadClasses', this.data.pageCamel);
		controllerFactoryDynamicFile.deleteCodeChunkFromCodeArea('switchBlock', this.data.pageCamel);
		controllerFactoryDynamicFile.save();

		// delete JSON file (if there is one)
		qfil.deleteFile(this.getJsonDataPathAndFileName(this.data.pageCamel));
	}

	log(line: string) {
		// eslint-disable-next-line no-console
		console.log(`>>> ${line}`);
	}
}

export default DpodSiteBuilder;
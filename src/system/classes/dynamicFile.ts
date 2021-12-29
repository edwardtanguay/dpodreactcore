// fixes VSCode variable-checking in other files (ts2451)
// export {};
import * as qstr from '../qtools/qstr';
import * as qfil from '../qtools/qfil';
import DynamicFileCodeArea from './dynamicFileCodeArea';
const fs = require('fs');
const path = require('path');

// TODO: force correct tabs when rebuilding code text
// TODO: make interfaces for all objects and classes
class DynamicFile {
	private pathAndFileName: string;
	private absolutePathAndFileName: string;
	private contents: string;
	private lines: string[];
	private dynamicCodeAreas: any[];
	private dynamicCodeAreaTemplateLines: string[];
	private dynamicCodeAreaObjects: any[];

	constructor(pathAndFileName: string) {
		this.pathAndFileName = pathAndFileName;
		this.absolutePathAndFileName = path.resolve(__dirname, this.pathAndFileName);
		this.contents = '';
		this.lines = [];
		this.dynamicCodeAreas = [];
		this.dynamicCodeAreaTemplateLines = [];
		this.dynamicCodeAreaObjects = this.getDynamicCodeAreaObjects();
		this.initialize();
	}

	initialize() {
		this.contents = fs.readFileSync(this.absolutePathAndFileName, 'utf8');
		this.lines = qstr.convertStringBlockToLinesNoTrim(this.contents);
		this.buildAreas();
	}

	// TODO: refactor this so that it uses an item Type instead of these classes, store all information in each item
	getDynamicCodeAreaObjects() {
		const dynamicCodeAreaObjects = [
			{
				idCode: 'code',
				marker: 'DYNAMIC_CODE_AREA',
				markerPrefix: '// ',
				markerSuffix: '',
				getFullMarker: function () {}
			},
			{
				idCode: 'jsx',
				marker: 'DYNAMIC_JSX_AREA',
				markerPrefix: '{/* ',
				markerSuffix: ' */}',
				getFullMarker: function () {}
			},
			{
				idCode: 'null',
				marker: '',
				markerPrefix: '',
				markerSuffix: '',
				getFullMarker: function () {}
			}
		];
		for (const dynamicCodeAreaObject of dynamicCodeAreaObjects) {
			dynamicCodeAreaObject.getFullMarker = function () {
				return this.idCode === 'null' ? '' : `${this.markerPrefix}${this.marker}: `;
			}
		}
		return dynamicCodeAreaObjects;
	}

	getChunkIdCodeFromLine(dynamicCodeAreaObject: any, line: string) {
		const searchMarker = dynamicCodeAreaObject.markerPrefix + '::';
		const parts = qstr.breakIntoParts(line, searchMarker);
		if (parts.length >= 2) {
			let r = parts[1];
			r = qstr.chopRight(r, dynamicCodeAreaObject.markerSuffix);
			return r;
		} else {
			return '';
		}
	}

	getIdCodeFromArea(dynamicCodeAreaObject: any, line: string) {
		let r = line.trim();
		const chopLeftText = dynamicCodeAreaObject.markerPrefix + dynamicCodeAreaObject.marker + ': ';
		r = qstr.chopLeft(r, chopLeftText);
		r = qstr.chopRight(r, dynamicCodeAreaObject.markerSuffix);
		return r;
	}

	getDynamicCodeAreaObject(line: string) {
		for (const dynamicCodeAreaObject of this.dynamicCodeAreaObjects) {
			if (line.includes(dynamicCodeAreaObject.getFullMarker())) {
				return dynamicCodeAreaObject;
			}
		}
		return null;
	}

	buildAreas() {
		let currentCodeArea = null;
		let currentlyRecordingCodeArea = false;
		let currentChunkIdCode = '';
		let currentNumberOfCodeChunkLinesRecorded = 0;
		let chunkIdCode = '';
		let holdCurrentDynamicCodeAreaObject = null;
		for (const line of this.lines) {
			const currentDynamicCodeAreaObject = this.getDynamicCodeAreaObject(line);
			if (currentDynamicCodeAreaObject.idCode !== 'null') {
				holdCurrentDynamicCodeAreaObject = currentDynamicCodeAreaObject;
				const codeAreaSignature = this.getIdCodeFromArea(currentDynamicCodeAreaObject, line);
				currentCodeArea = new DynamicFileCodeArea(codeAreaSignature, currentDynamicCodeAreaObject);
				currentlyRecordingCodeArea = true;
				currentNumberOfCodeChunkLinesRecorded = 0;
				this.dynamicCodeAreaTemplateLines.push('[[DYNAMIC_CODE_AREA:' + currentCodeArea.idCode + ']]');
			} else if (currentlyRecordingCodeArea) {
				chunkIdCode = this.getChunkIdCodeFromLine(holdCurrentDynamicCodeAreaObject, line);
				if (!qstr.isEmpty(chunkIdCode)) {
					currentCodeArea!.addLineToCodeChunk(chunkIdCode, line);
					currentNumberOfCodeChunkLinesRecorded = 1;
					currentChunkIdCode = chunkIdCode;
				} else {
					if (currentNumberOfCodeChunkLinesRecorded === currentCodeArea!.linesInCodeChunk) {
						this.dynamicCodeAreas.push(currentCodeArea!);
						currentCodeArea = null;
						currentlyRecordingCodeArea = false;
						currentNumberOfCodeChunkLinesRecorded = 0;
						currentChunkIdCode = '';
					} else {
						currentCodeArea!.addLineToCodeChunk(currentChunkIdCode, line);
						currentNumberOfCodeChunkLinesRecorded++;
					}
				}
			}
			if (!currentlyRecordingCodeArea) {
				this.dynamicCodeAreaTemplateLines.push(line);
			}

		}
	}


	debugOutput() {
		for (const codeArea of this.dynamicCodeAreas) {
			codeArea.debugOutput();
		}
		console.log('TEMPLATE FOR CODE AREAS:');
		console.log('=================================');
		console.log(qstr.convertLinesToStringBlock(this.dynamicCodeAreaTemplateLines));
		console.log('=================================');
		console.log(qstr.convertLinesToStringBlock(this.getLinesWithUpdatedCodeAreas()));
		console.log('=================================');


	}

	// e.g. finds a line like this: "//extensions: jquery, bootstrap" and returns 'jquery, bootstrap'
	getDataFromVariableLine(marker: string) {
		const variableLinePrefix = `//DYNAMIC_VARIABLE:${marker}=`;
		for (const line of this.lines) {
			if (line.includes(variableLinePrefix)) {
				const data = qstr.chopLeft(line, variableLinePrefix);
				const cleanData = qstr.replaceAll(data, '\r', '');
				return cleanData;
			}
		}
		return '';
	}

	getIdCodeArrayFromVariableLine(marker: string) {
		const extensionLine = this.getDataFromVariableLine(marker);
		const idCodes = qstr.breakIntoParts(extensionLine, ',');
		return idCodes;
	}

	getLine(lineNumber: number) {
		if (lineNumber > this.lines.length || lineNumber < 1) {
			return '';
		}
		const index = lineNumber - 1;
		const line = this.lines[index];
		const cleanLine = qstr.replaceAll(line, '\r', '');
		return cleanLine;
	}

	changeMarkerLineAndSave(marker: string, newLine: string) {
		const fullMarker = '//DYNAMIC_LINE:' + marker;
		const newLines = [];
		for (const line of this.lines) {
			if (line.includes(fullMarker)) {
				const numberOfPrecedingTabs = qstr.getNumberOfPrecedingTabs(line);
				const fullNewLine = qstr.addPrecedingTabs(newLine, numberOfPrecedingTabs) + fullMarker;
				newLines.push(fullNewLine);
			} else {
				newLines.push(line);
			}
		}
		this.lines = newLines;
		this.saveSimpleLines();
	}

	saveSimpleLines() {
		qfil.createFileWithLines(this.pathAndFileName, this.lines);
	}

	save() {
		const lines = this.getLinesWithUpdatedCodeAreas();
		qfil.createFileWithLines(this.absolutePathAndFileName, lines);
	}

	getCodeArea(codeAreaIdCode: string) {
		for (const codeArea of this.dynamicCodeAreas) {
			if (codeArea.idCode === codeAreaIdCode) {
				return codeArea;
			}
		}
		return null;
	}

	addCodeChunkToCodeArea(codeAreaIdCode: string, codeChunkIdCode: string, lineOrLines: string|string[]) {
		let lines = null;
		if (qstr.isArray(lineOrLines)) {
			lines = lineOrLines;
		}
		if (qstr.isString(lineOrLines)) {
			lines = [lineOrLines];
		}
		if (qstr.isArray(lines)) {
			const codeArea = this.getCodeArea(codeAreaIdCode);
			if (codeArea !== null) {
				codeArea.addNewCodeChunk(codeChunkIdCode, lines);
			}
		}
	}

	deleteCodeChunkFromCodeArea(codeAreaIdCode: string, codeChunkIdCode: string) {
		const codeArea = this.getCodeArea(codeAreaIdCode);
		if (codeArea != null) {
			codeArea.deleteCodeChunk(codeChunkIdCode);
		}
	}

	getCodeAreaIdCodeFromTemplateMarker(line: string) {
		let r = line;
		r = qstr.chopLeft(r, '[[DYNAMIC_CODE_AREA:');
		r = qstr.chopRight(r, ']]');
		return r;
	}

	getLinesWithUpdatedCodeAreas() {
		let lines: string[] = [];
		for (const line of this.dynamicCodeAreaTemplateLines) {
			if (line.startsWith('[[DYNAMIC_CODE_AREA')) {
				const areaCodeIdCode = this.getCodeAreaIdCodeFromTemplateMarker(line);
				const areaCode = this.getCodeArea(areaCodeIdCode);
				lines = qstr.addLinesToLines(lines, areaCode.getLinesForTemplateInsertion());
			} else {
				lines.push(line);
			}
		}
		return lines;
	}

}

export default DynamicFile;
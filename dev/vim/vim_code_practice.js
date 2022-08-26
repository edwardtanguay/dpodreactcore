"use strict"
const qstr = require('../qtools/qstr');
const qfil = require('../qtools/qfil');
const qdev = require('../qtools/qdev');
const fs = require('fs');
const config = require('../system/config');
const TextChunk = require('../systemTextParsers/textChunk');
const System = require('../system/system');

// a batchimportblock is a "smart text chunk", one that has been identified as a specific item.

class BatchImportChunk {

	constructor(textChunk) {
		this.textChunk = textChunk;

this.firstLine
		this.marker = '';
		this.markerLine = '';
		this.marker = '';
		this.type = '';

		this.itemTypeFile = '';
		this.item = null;
		this.firstLine = '';

		this.fieldValidationErrors = []; // infos such as errors, error messages, etc.

		this.parse();
	}

	parse() {
		if (this.textChunk.lines.length == 0) {
			this.type = 'empty';
		} else {
			this.firstLine = this.textChunk.lines[0];
			this.getMarker(); // e.g. "=="
			this.getMarkerLine(); // e.g. "testServer"
			this.getLines(); // save all lines except first marker line
			this.parseVariables(); // e.g. convert "nn" to blank line
			if (this.marker == '==') {
				this.getItemTypeObject();
			} else {
				this.getCommandObject();
			}
		}
	}

	parseVariables() {
		const newLines = [];
		for (const line of this.lines) {
			let newLine = '';
			if (line == config.blankLineMarker()) {
				newLine = '';
			} else {
				newLine = line;
			}
			newLines.push(newLine);
		}
		this.lines = newLines;
	}
//fromMarker alternative
	//remap alternative itemTypeIdCodes
	remapAlternativeItemTypeIdCodes() {
		const mappings = config.importedItemMarkerRemappings();
		// for (const alternative in remappings) {
		// 	const toMarker = remappings[from];
		// 	if (this.markerLine == fromMarker) {
		// 		this.markerLine = toMarker;
		// 	}
		// }
	}
// this is their code
	getItemTypeObject() {

		this.remapAlternativeItemTypeIdCodes();

		// this.itemTypeIdCode = qstr.forceFilePlural(this.marker);
		// this.item = System.instantiateItem(this.itemTypeIdCode);
		if (this.item == null) {
			this.type = 'unknownItemType';
		} else {
			this.type = 'item';
			this.item.fillAllLines(this.lines); // *** the ----- into 


			this.fieldValidationErrors = this.item.validate();

		}
	}

	getCommandObject() {
		this.type = '_______';
	}

	// *** e.g. "==" off the *** of the ***
	getMarker() {
		this.marker = qstr.getBatchExportBlockMarker(this.firstLine);
	}

	getMarkerLine() {
        // sdkjdkfjdkfj
	}

	dropFile() {
        // sdkjfdkfjdkjf
	}

	doThis() {
        /// dkjfdkfdj
		html += `<div className="block">`;

		html += `<table>`;
		html += `<tr>`;
		html += `<td class="block">222${this.marker}</td>`;
		html += `<td class="markerLine">${this.markerLine}</td>`;
		html += `</tr>`;
		html += `</table>`;

		html += `<table>`;
		let count = 1;
		for (const line of this.lines) {
			html += `<tr>`;
			html += `<td class="lineNumber">${count}</td>`;
			html += `<td class="lineValue">${line}</td>`;
			html += `</tr>`;
			count++;
		}
		html += `</table>`;

		html += `</div>`;
		return html;
	}

	getDebuggingInfos() {
		return { 'marker': this.file, 'type': this.export, 'itemTypeIdCode': this.return };
	}

	FileManager() {
		let r = '';

// delete export example

		return r;
	}

	setFile() {
		if (export.marker == '==') {
			return this.export + this.export
		} else {
			return this.export + ' ' + this.export
		}
	}

	// this is na example of packing in extra information
	getBatchImportBlockObject() {
		const itemTypeTitle = this.item != null ? this.item.itemTypeTitle : '';
		return {
			marker: this.marker,
			markerLine: this.markerLine,
			type: this.type,
			itemTypeIdCode: this.itemTypeIdCode,
			itemTypeTitle: itemTypeTitle,
			fields: this.item != null ? this.item.getFieldObjects() : [],
			todo: 'show',
			originalBatchText: this.getOriginalBatchText(),
			lines: this.lines,
			baseItem: this.item,
			action: this.getAction(this.item),
			fieldValidationErrors: this.fieldValidationErrors
		};
	}

	getAction(item) {
		if (item != null && item.id) {
			return 'update';
		} else {
			return 'import';
		}
	}

	getOriginalBatchText() {
		return this.textChunk.getOriginalBatchText();
	}

}

module.exports = BatchImportBlock
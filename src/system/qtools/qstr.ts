import OutlineTextParser from '../classes/outlineTextParser';
import * as qstr from './qstr';

const Markdown = require('markdown').markdown;

// import * as qstr from '../qtools/qstr';

/**
 * Capitalize the first letter of a string.
 *
 * qstr.capitalizeFirstLetter("this is a sentence.");
 *
 * "This is a sentence."
 */
export const capitalizeFirstLetter = (line: string) => {
	return line.charAt(0).toUpperCase() + line.slice(1);
}

/**
 * REPLACE ALL OCCURANCES IN A STRING:
 *
 * qstr.replaceAll("This is a tost.", "o", "e");
 *
 * "This is a test."
 */
export const replaceAll = (text: string, search: string, replace: string) => {
	return text.split(search).join(replace);
};

/**
 * Check if a string is inside another string.
 *
 * qstr.contains("This is a test.", "test");
 *
 * true
 */
export const contains = (line: string, searchText: string) => {
	return String(line).includes(searchText);
}

/**
 * Check if a string has another string at the end.
 *
 * qstr.contains("This is a test.", ".");
 *
 * true
 */
export const endsWith = (main: string, part: string) => {
	return main.endsWith(part);
}

/**
 * Check if a string is empty.
 *
 * qstr.isEmpty('');
 *
 * true
 */
export const isEmpty = (line: string) => {
	if (line === undefined || line === null) {
		return true;
	}
	line = line.toString();
	if (line.trim() === '') {
		return true;
	}
	return false;
};

/**
 * Removes text from the end of a string.
 *
 * qstr.chopRight('book-001', '-001');
 *
 * 'book'
 */
export const chopRight = (main: string, textToChop: string) => {
	if (main.endsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(0, mainLen - (len));
		}
	}
	return main;
};

export const chopLeft = (main: string, textToChop: string) => {
	if (main.startsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(len, mainLen);
		}
	}
	return main;
};

export const breakIntoParts = (main: string, delimiter: string = ',', maximumNumberOfParts: number = 0) => {
	const escapedDelimiter = `\\${delimiter}`;
	const mask = '@@@MASK@@@';
	if (qstr.isEmpty(main)) {
		return [];
	}

	const maskedMain: string = qstr.replaceAll(main, escapedDelimiter, mask);
	const roughParts: string[] = maskedMain.split(delimiter);
	let parts: string[] = [];
	roughParts.forEach((part: string) => {
		let newPart: string = part;
		newPart = newPart.trim();
		parts.push(newPart);
	});
	if (maximumNumberOfParts !== 0 && maximumNumberOfParts < parts.length) {
		const consolidatedParts: string[] = [];
		parts.forEach((part, index) => {
			if (index < maximumNumberOfParts - 1) {
				consolidatedParts.push(part);
			} else {
				const current: string = consolidatedParts[maximumNumberOfParts - 1];
				let prefix: string = '';
				if (current !== undefined) {
					prefix = `${current};`;
				}
				consolidatedParts[maximumNumberOfParts - 1] = prefix + part;
			}
		});
		parts = consolidatedParts;
	}

	// unmask
	const unmaskedParts = [];
	for (const part of parts) {
		const unmaskedPart = qstr.replaceAll(part, mask, delimiter);
		unmaskedParts.push(unmaskedPart);
	}
	parts = unmaskedParts;

	return parts;
}

export const convertBackSlashesToForwardSlashes = (pathAndFileName: string) => qstr.replaceAll(pathAndFileName, '\\', '/');

export const forceStringAsInteger = (str: string): number => {
	if (str === 'null' || qstr.isEmpty(str)) {
		return 0;
	}
	return parseInt(str);
}

/**
 * MAKE SURE NUMBERS ARE A CERTAIN NUMBER OF DIGITS WITH PRECEDING ZEROS
 *
 * qstr.padZeros(4,2)
 *
 * "04"
 */
export const padZeros = (num: number, numZeros: number) => {
	const n = Math.abs(num);
	const zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
	// eslint-disable-next-line no-restricted-properties
	const zeroString = Math.pow(10, zeros).toString().substr(1);
	return zeroString + n;
};

// also does full trim, of array and each line
export const convertStringBlockToLines = (stringBlock: string, trimLines = true) => {
	let roughLines: string[] = [];

	if (qstr.isEmpty(stringBlock)) {
		return [];
	}
	roughLines = stringBlock.split('\n');
	if (trimLines) {
		roughLines = qstr.trimAllLinesInLinesArray(roughLines);
	}
	roughLines = qstr.trimLinesOfEndBlanks(roughLines);
	return roughLines;
}

// also does full trim, of array and each line
export const convertStringBlockToLinesNoTrim = (stringBlock: string) => {
	return qstr.convertStringBlockToLines(stringBlock, false);
}

export const trimAllLinesInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = line.trim();
		newLines.push(newLine);
	});
	return newLines;
}

// returns a lines array that has front and end blank strings, as one without these blanks
export const trimLinesOfEndBlanks = (lines: string[]) => {
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	return lines;
}

// if first line of lines array is blank, it will remove it
// but don't remove any blank lines from middle or end
export const trimBeginningLinesOfBlanks = (lines: string[]) => {
	const newLines: string[] = [];
	let trimmingBlanks = true;
	lines.forEach(function (line) {
		const newLine = line;
		if (trimmingBlanks && line === '') {
			// skip it since it is a preceding blank item
		} else {
			newLines.push(newLine);
			trimmingBlanks = false;
		}
	});
	return newLines;
}
export const encodeHtmlForDisplay = (html: string) => {
	return String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


export const getNumberOfPrecedingTabs = (text: string, forceRealTabs = false) => {
	let tempText = text;
	let numberOfPrecedingTabs = 0;
	let tab = qstr.TAB();
	if (forceRealTabs) {
		tab = '\t';
	}
	while (tempText.startsWith(tab)) {
		tempText = qstr.chopLeft(tempText, tab);
		numberOfPrecedingTabs += 1;
	}
	return numberOfPrecedingTabs;
}

// e.g. - im [intranet](http://intranet/index.php)
export const containsUrlMarkdown = (text: string) => {
	if (qstr.contains(text, '(') && qstr.contains(text, ')') && qstr.contains(text, '[') && qstr.contains(text, ']')) {
		return true;
	}
	return false;
}

export const parseMarkDown = (markdownText: string, options = { suppressParagraphMarks: false, suppressOrderedListElements: false }) => {
	let r = markdownText;

	if (options.suppressOrderedListElements) {
		r = qstr.maskText(r, '.');
	}

	r = Markdown.toHTML(r);
	if (options.suppressParagraphMarks) {
		r = qstr.chopLeft(r, '<p>');
		r = qstr.chopRight(r, '</p>');
	}

	if (options.suppressOrderedListElements) {
		r = qstr.unmaskText(r);
	}
	return r;
}

export const maskText = (contents: string, textToMask: string) => {
	let r = contents;
	const maskedText = `§12345§${textToMask}§54321§`;
	r = qstr.replaceAll(r, textToMask, maskedText);
	return r;
}

export const unmaskText = (contents: string) => {
	let r = contents;
	r = qstr.replaceAll(r, '§12345§', '');
	r = qstr.replaceAll(r, '§54321§', '');
	return r;
}

export const linkify = (inputText: string) => {
	// URLs starting with http://, https://, or ftp://
	let replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; // eslint-disable-line
	let replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	// URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	let replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim; // eslint-disable-line
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

	// Change email addresses to mailto:: links.
	let replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim; // eslint-disable-line
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

	return replacedText;
}

/**
 * Get an array of all regex matches
 *
 * getArrayWithRegex("You can spell it either color or colour if you are talking about color.", /colou?r/);
 *
 * [ 'color', 'colour', 'color' ]
 */
export const getArrayWithRegex = function (text: string, regex: RegExp): any {
	return text.match(new RegExp(regex, 'g'));
};

/**
 * replace text in a string with a regular expression
 *
 * replaceAllRegex("The capital of France is *Paris* and the capital of Spain is *Madrid*.", /(\*.*?\*)/, "[_________]");
 *
 * "The capital of France is [_________] and the capital of Spain is [_________]."
 */
export const replaceAllRegex = function (text: string, regex: RegExp, replace: string) {
	if (replace === undefined) {
		return text;
	}
	return text.replace(new RegExp(regex, 'g'), replace);
};

export const linesContainCode = (lines: string[]) => {
	let rb = false;
	const codeIdentifyingTexts = [
		'Private Sub',
		'{',
		'}',
		'/&gt;',
		'&lt;/',
		'End Sub',
		'()',
		'CREATE TABLE',
		'Dim ',
		'console.log(',
		'guifont=',
		'print("',
		'window.title',
		'CreateObject',
		'def main()'
	];
	if (qstr.linesContainAnyOfThese(lines, codeIdentifyingTexts)) {
		rb = true;
	}
	if (lines.length === 1 && qstr.endsWith(lines[0], ';')) {
		rb = true;
	}
	return rb;
}

export const linesContainAnyOfThese = function (lines: string[], codeIdentifyingTexts: string[]) {
	for (const line of lines) {
		for (const text of codeIdentifyingTexts) {
			if (line.includes(text)) {
				return true;
			}
		}
	}
	return false;
}

export const addPrecedingTabs = (text: string, numberOfPrecedingTabs: number) => {
	const tab = qstr.TAB();
	return tab.repeat(numberOfPrecedingTabs) + text;
}

export const convertLinesToStringBlock = (lines: string[]) => {
	let r = '';
	let index = 0;
	for (const line of lines) {
		r += line;
		if (index !== lines.length - 1) {
			r += qstr.NEW_LINE();
		}
		index += 1;
	}
	return r;
}

export const NEW_LINE = (numberOfNewLines: number = 1) => {
	const endOfLine = '\n';
	return endOfLine.repeat(numberOfNewLines);
}


// $choices=Yes, please send it to me.|No, please don't send it to me.|I'll decide later; $required; $info=Remember, you can unsubscribe at any time.; $default=no
export const parseExtras = (extras: string) => {
	const parts = qstr.breakIntoParts(extras, ';');
	const extrasObject: any = {};
	for (const part of parts) {
		const pieces = qstr.breakIntoParts(part, '=');

		// idCode
		const idCodePiece = pieces[0]; // $choices
		const idCode = qstr.chopLeft(idCodePiece, '$');

		// value
		let value = '';
		if (pieces.length > 1) {
			// eslint-disable-next-line prefer-destructuring
			value = pieces[1];
		}

		extrasObject[idCode] = value;

	}
	return extrasObject;
}

export const getExtrasValue = (extras: string, variableName: string) => {
	const extrasObject = qstr.parseExtras(extras);
	const value = extrasObject[variableName];
	if (value === undefined) {
		return '';
	}
	return value;
}

// Forces a string to be in title notation, e.g. First Name.
export const forceTitleNotation = (term: string) => {
	let r = term;

	// it is a one-word acronym like "UPS", then just keep it that way
	if (qstr.isAllUppercase(r) && !r.includes(' ')) {
		return r;
	}
	r = term;
	// if at this point we have e.g. "THIS IS A GOOD THING", then lowercase it first here
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	}

	// get the text notation, e.g. "first name"
	const textNotation = qstr.forceTextNotation(r);

	// now uppercase the first letter of each word
	const words = qstr.breakIntoParts(textNotation, ' ');

	r = '';
	words.forEach(function (word) {
		r += `${qstr.capitalizeFirstLetter(word).trim()} `;
	});

	r = r.trim();

	// handle the punctuation rules for English, lowercase prepositions and articles under 7 letters
	r = qstr.renderEnglishTitleCapitalization(r);

	return r;
}

export const isAllUppercase = (term: string) => {
	if (term.toUpperCase() === term) {
		return true;
	}
	return false;
}

export const forceTextNotation = (term: string) => {
	let r = term;

	r = r.trim();

	// if is all caps like "FIRST ANNUAL REPORT" then we don't want "F I R S T   A N N U A L   R E P O R T"
	// but "first annual report"
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	}
	r = qstr.insertSpaceBeforeEveryUppercaseCharacter(r);

	// now lowercase everything
	r = r.toLowerCase();

	r = r.trim();

	return r;
}

export const insertSpaceBeforeEveryUppercaseCharacter = (term: string) => {
	let r = '';
	const forCheckingTerm = `${term} `;
	for (let i = 0; i < term.length; i += 1) {
		const character = forCheckingTerm.charAt(i);
		// const characterAfter = forCheckingTerm.charAt(i + 1);
		if (qstr.isUppercaseLetter(character)) {
			r += ' ';
		}
		r += character;
	}
	r = qstr.forceAllMultipleSpacesToSingleSpace(r);
	return r;
}

export const isUppercaseLetter = (character: string) => {
	const regex = new RegExp('[A-Z]');
	return character.length === 1 && regex.test(character);
}

export const forceAllMultipleSpacesToSingleSpace = (term: string) => {
	return term.replace(/(\s)+/g, ' ');
}

export const renderEnglishTitleCapitalization = (term: string) => {
	let r = term;

	const termsToLowercase = ['A', 'An', 'The', 'Or', 'And', 'Of', 'For', 'With', 'Into', 'From'];

	// mask
	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = `: ${termToLowerCase} `;
		const replaceText = `:@${termToLowerCase}`;
		r = r.replace(searchText, replaceText);
	});

	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = ` ${termToLowerCase} `;
		const replaceText = searchText.toLowerCase();
		r = r.replace(searchText, replaceText);
	});

	// unmask
	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = `:@${termToLowerCase} `;
		const replaceText = `: ${termToLowerCase} `;
		r = r.replace(searchText, replaceText);
	});
	return r;
}

export const forceCamelNotation = (term: string) => {
	let r = term;

	// specials
	r = r === 'ID-Code' ? 'id code' : r;

	// first change all e.g. "single-page" to "single page"
	r = qstr.replaceAll(r, '-', ' ');

	// if it is all uppercase (e.g. FAQ) then we want all lower case (faq) and not (fAQ)
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	} else {

		// get the pascal notation first
		const pascalNotation = qstr.forcePascalNotation(r);

		// now lowercase the first character
		r = qstr.lowercaseFirstLetter(pascalNotation);
	}

	// make sure no spaces are in the string, e.g. "showcaseType Script" --> "showcaseTypeScript"
	r = qstr.replaceAll(r, ' ', '');

	return r;
}

export const forcePascalNotation = (term: string) => {
	let r = String(term);

	// exceptions
	if (r.toLowerCase() === 'id-code') {
		return 'IdCode';
	}

	r = qstr.cleanForCamelAndPascalNotation(r);

	// convert to "First Name"
	r = qstr.forceTitleNotation(r);

	// force EVERY word to be uppercase, as it may be here "Save and Close"
	r = qstr.forceCapitalizeFirstCharacterOfEveryWord(r);

	// now simply take all spaces out
	r = r.replace(' ', '');

	// make sure no spaces are in the string, e.g. "showcaseType Script" --> "showcaseTypeScript"
	r = qstr.replaceAll(r, ' ', '');

	return r;
}


// "Project 1: The Book Sections" => "Project 1 The Book Sections"
// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const cleanForCamelAndPascalNotation = (term: string) => {
	let r = term;
	r = qstr.convertForeignCharactersToStandardAscii(r);
	r = r.replace(/[^A-Za-z0-9 ]/g, '');
	return r;
}

// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const convertForeignCharactersToStandardAscii = (term: string) => {
	let r = term;
	// French
	r = r.replace('è', 'e');
	r = r.replace('à', 'e');
	r = r.replace('ê', 'e');
	// todo: add more that you need, with tests

	// German
	r = r.replace('ö', 'oe');
	r = r.replace('ß', 'ss');
	r = r.replace('ü', 'ue');
	r = r.replace('ä', 'ae');
	r = r.replace('Ö', 'OE');
	r = r.replace('Ü', 'UE');
	r = r.replace('Ä', 'AE');
	return r;
}

export const forceCapitalizeFirstCharacterOfEveryWord = (term: string) => {
	let r = '';
	const words = qstr.breakIntoParts(term, ' ');
	if (words.length > 0) {
		words.forEach(function (word) {
			r += `${qstr.capitalizeFirstLetter(word)} `;
		});
		r = r.trim();
	}
	return r;
}

export const lowercaseFirstLetter = (term: string) => {
	return term.charAt(0).toLowerCase() + term.slice(1);
}

export const randomize = (array: any) => {
	let currentIndex = array.length;
	let temporaryValue = null;
	let randomIndex = null;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// e.g. "fargate aws engine"
export const searchTextMatches = (searchText: string, body: string) => {
	const searchWords = qstr.breakIntoParts(searchText, ' ');
	for (const searchWord of searchWords) {
		if (!body.toUpperCase().includes(searchWord.toUpperCase())) {
			return false;
		}
	}
	return true;
}

export const getSingularPluralSyntaxVariations = (itemTypeIdCode: string, prefix: string) => {
	const camelPlural = itemTypeIdCode;
	const camelSingular = qstr.forceSingular(camelPlural);
	const syntaxVariations: any = {};
	syntaxVariations[`${prefix}CamelPlural`] = camelPlural;
	syntaxVariations[`${prefix}CamelSingular`] = camelSingular;
	syntaxVariations[`${prefix}PascalPlural`] = qstr.forcePascalNotation(camelPlural);
	syntaxVariations[`${prefix}PascalSingular`] = qstr.forcePascalNotation(camelSingular);
	syntaxVariations[`${prefix}TitlePlural`] = qstr.forceTitleNotation(camelPlural);
	syntaxVariations[`${prefix}TitleSingular`] = qstr.forceTitleNotation(camelSingular);
	syntaxVariations[`${prefix}TextPlural`] = qstr.forceTextNotation(camelPlural);
	syntaxVariations[`${prefix}TextSingular`] = qstr.forceTextNotation(camelSingular);
	syntaxVariations[`${prefix}AllcapsSingular`] = camelSingular.toUpperCase();
	syntaxVariations[`${prefix}AllcapsPlural`] = camelPlural.toUpperCase();
	return syntaxVariations;
}

// "Contract Information" --> "Contract Information", "contract information", "contractInformation", etc.
export const getTermSyntaxVariations = (termTitleNotation: string, prefix: string) => {
	const syntaxVariations: any = {};
	syntaxVariations[`${prefix}Title`] = termTitleNotation;
	syntaxVariations[`${prefix}Text`] = qstr.forceTextNotation(termTitleNotation);
	syntaxVariations[`${prefix}Camel`] = qstr.forceCamelNotation(termTitleNotation);
	syntaxVariations[`${prefix}Pascal`] = qstr.forcePascalNotation(termTitleNotation);
	syntaxVariations[`${prefix}Allcaps`] = termTitleNotation.toUpperCase();
	return syntaxVariations;
}

// convert quarterReports to quarterReport
export const forceSingular = (potentialPluralNotation: string) => {
	return qstr.chopRight(potentialPluralNotation, 's');
}

// convert quarterReport to quarterReports
export const forcePlural = (potentialSingularNotation: string) => {
	if (!qstr.endsWith(potentialSingularNotation, 's')) {
		return `${potentialSingularNotation}s`;
	}
	return potentialSingularNotation;

}

export const removeEndMarkerAndGetNumberOfPrecedingTabsAndLine = (line: string, marker: string): any[] => {
	const numberOfPrecedingTabs = qstr.getNumberOfPrecedingTabs(line);
	let newLine = qstr.chopLeft(line, qstr.tabs(numberOfPrecedingTabs));
	newLine = qstr.stripEndingMarker(newLine, marker);
	return [numberOfPrecedingTabs, newLine];
}

export const TAB = (numberOfTabs: number = 1) => {
	const tab = "    "; // 4 spaces
	return tab.repeat(numberOfTabs);
}

export const tabs = function (num: number) {
	const tab = qstr.TAB();
	return tab.repeat(num);
}

// e.g. "const temp = 2; //:temp", return "const temp = 2;"
export const stripEndingMarker = (text: string, marker: string) => {
	const parts = qstr.breakIntoParts(text, marker);
	if (parts.length > 0) {
		return parts[0];
	}
	return '';
}

// e.g. "//DYNAMIC_CODE_AREA: loadTools", return "loadTools"
export const getRestAfterMarker = (text: string, marker: string) => {
	const parts = qstr.breakIntoParts(text, marker);
	if (parts.length > 1) {
		return parts[1];
	}
	return '';
}

export const addLinesToLines = (lines1: string[], lines2: string[]) => {
	const lines = lines1;
	for (const line of lines2) {
		lines.push(line);
	}
	return lines;
}

export const isString = (obj: any) => {
	if (typeof obj === 'string' || obj instanceof String) {
		return true;
	} else {
		return false;
	}
}

export const isArray = (obj: any) => {
	if (Array.isArray(obj)) {
		return true;
	} else {
		return false;
	}
}

export const smartPlural = (number: number, singularNoun: string, pluralNoun: string = '') => {
	let r = '';
	if (pluralNoun === '') pluralNoun = singularNoun + 's';
	r += number + ' ';
	r += number === 1 ? singularNoun : pluralNoun;
	return r;
}

export const escapeHtml = (html: string) => {
	const tagsToReplace: any = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;'
	};
	return html.replace(/[&<>]/g, function (tag) {
		return tagsToReplace[tag] || tag;
	});
};

// TODO: fix replaceAll (es2021 error from TypeScript)
// const parseMarkdownLite = (markdown: string) => {
// 	let r = markdown;
// 	r = qstr.escapeHtml(r);
// 	r = r.replaceAll('\r\n', '<br/>');
// 	r = r.replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
// 	r = r.replaceAll(/`(.*?)`/gm, '<code>$1</code>');
// 	r = r.replaceAll(/\*\*(.*?)\*\*/gm, '<b>$1</b>');
// 	r = r.replaceAll(/\*(.*?)\*/gm, '<i>$1</i>');
// 	return r;
// }

export const parseOutline = (outlineText: string, itemTypeIdCode = '', options = {}) => {
	const outlineTextParser = new OutlineTextParser(outlineText, options);
	const imageDirectory = itemTypeIdCode === '' ? 'general' : itemTypeIdCode;
	outlineTextParser.relativePublicImageDirectory = `customImages/${imageDirectory}`;
	outlineTextParser.parse();
	return outlineTextParser.displayParsed();
}

export const wrapFoundSearchWordsWithClassElement = (text: string, searchText: string, className: string) => {
	// searchText = "regex vue"
	// regexString = "(regex)|(vue)"
	// regexReplaceString = "$1$2";
	const escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");
	const searchWords = escapedSearchText.split(' ').filter(word => word.length >= 3);
	if (searchWords.length > 0) {
		const regexSearchString = searchWords.map(word => `(${word})`).join('|');
		const regexReplaceString = searchWords.map((_m, i) => '$' + String(i + 1)).join('');
		const re = new RegExp(regexSearchString, "ig");
		const result = text.replace(re, `<span class="searchHighlight">${regexReplaceString}</span>`)
		return result === undefined ? text : result;
	} else {
		return text;
	}
}

export const includesOneOfTheseWords = (text: string, words: string) => {
	for (const word of words) {
		console.log(text.toLowerCase(), word);
		if (text.toLowerCase().includes(word)) {
			return true;
		}
	}
	return false;
};
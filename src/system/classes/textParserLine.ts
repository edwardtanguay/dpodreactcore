/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
const qstr = require('../qtools/qstr');
// const qfil = require('../qtools/qfil');

// TODO: CHANGE TO outlineTextParserLine
class TextParserLine {

	options: any;
	line: string;
	lineNumber: number;
	lastNumberOfIndents: number;
	totalNumberOfLines: number;
	relativePublicImageDirectory: string;
	rawLine: string;
	numberOfIndents: number;
	imageIdCode: string;
	animationIdCode: string;
	imageFileName: string;
	animationFileName: string;
	sourceImageAbsolutePath: string;
	sourceAnimationAbsolutePath: string;
	targetImageAbsolutePath: string;
	targetAnimationAbsolutePath: string;
	sourceImageAbsolutePathAndFileName: string;
	sourceAnimationAbsolutePathAndFileName: string;
	targetImageAbsolutePathAndFileName: string;
	targetAnimationAbsolutePathAndFileName: string;
	imagePathAndFileName: string;
	animationPathAndFileName: string;
	content: string;
	preHtml: string;
	html: string;
	postHtml: string;
	codeBlockLines: string[];
	codeBlockNumberOfIndents: number[];
	videoIdCode: string;


	constructor(line: string, lineNumber: number, lastNumberOfIndents: number, totalNumberOfLines: number, options = {}) {
		this.options = options;
		this.line = line;
		this.lineNumber = lineNumber;
		this.lastNumberOfIndents = lastNumberOfIndents;
		this.totalNumberOfLines = totalNumberOfLines;
		this.relativePublicImageDirectory = '';
		this.rawLine = line;
		this.numberOfIndents = qstr.getNumberOfPrecedingTabs(line, true);
		this.imageIdCode = '';
		this.animationIdCode = '';
		this.imageFileName = '';
		this.animationFileName = '';
		this.sourceImageAbsolutePath = '';
		this.sourceAnimationAbsolutePath = '';
		this.targetImageAbsolutePath = '';
		this.targetAnimationAbsolutePath = '';
		this.sourceImageAbsolutePathAndFileName = '';
		this.sourceAnimationAbsolutePathAndFileName = '';
		this.targetImageAbsolutePathAndFileName = '';
		this.targetAnimationAbsolutePathAndFileName = '';
		this.imagePathAndFileName = '';
		this.animationPathAndFileName = '';
		this.content = qstr.chopLeft(line.trim(), '- ').trim();
		this.preHtml = '';
		this.html = '';
		this.postHtml = '';
		this.codeBlockLines = [];
		this.codeBlockNumberOfIndents = [];
		this.videoIdCode = '';

		this.parseImageIdCode();
		this.parseVideoIdCode();
		this.parseAnimationIdCode();
	}

	parseImageIdCode() {
		const regex = /##([a-zA-Z0-9]*)$/;
		const matches = this.content.match(regex)
		this.content = this.content.replace(regex, '');
		if (matches != null) {
			this.imageIdCode = matches[1];
		}
	}

	parseVideoIdCode() {
		const regex = /@@([a-zA-Z0-9]*)$/;
		const matches = this.content.match(regex)
		this.content = this.content.replace(regex, '');
		if (matches != null) {
			this.videoIdCode = matches[1];
		}
	}

	parseAnimationIdCode() {
		const regex = /#gif#([a-zA-Z0-9]*)$/;
		const matches = this.content.match(regex)
		this.content = this.content.replace(regex, '');
		if (matches != null) {
			this.animationIdCode = matches[1];
		}
	}

	parse() {

		// process image file
		if (this.imageIdCode !== '') {
			this.imageFileName = `${this.imageIdCode}.png`;
			this.sourceImageAbsolutePathAndFileName = this.sourceImageAbsolutePath + this.imageFileName;
			this.targetImageAbsolutePathAndFileName = this.targetImageAbsolutePath + this.imageFileName;

			// qfil.forceCreateDirectory(this.targetImageAbsolutePath);
			/*
			if (qfil.fileExists(this.sourceImageAbsolutePathAndFileName) && !qfil.fileExists(this.targetImageAbsolutePathAndFileName)) {
				qfil.copyFileAbsolute(this.sourceImageAbsolutePathAndFileName, this.targetImageAbsolutePathAndFileName);
			}
			*/
			this.imagePathAndFileName = `${this.relativePublicImageDirectory}/${this.imageFileName}`;
		}

		// process animation file
		if (this.animationIdCode !== '') {
			this.animationFileName = `${this.animationIdCode}.gif`;
			this.sourceImageAbsolutePathAndFileName = this.sourceImageAbsolutePath + this.animationFileName;
			this.targetImageAbsolutePathAndFileName = this.targetImageAbsolutePath + this.animationFileName;

			this.animationPathAndFileName = `${this.relativePublicImageDirectory}/${this.animationFileName}`;
		}


		const numberOfIndents = qstr.getNumberOfPrecedingTabs(this.line, true);
		if (this.lineNumber === 1) {
			this.preHtml += '<ul class="outline">';
		} else if (this.lastNumberOfIndents < numberOfIndents) {
			this.preHtml += '<ul class="outline">';
		} else if (this.lastNumberOfIndents > numberOfIndents) {
			for (let x = 1; x <= this.lastNumberOfIndents - numberOfIndents; x += 1) {
				this.preHtml += '</ul>';
			}
		}

		this.preHtml += '<li>';
		this.html += this.parseForOutline();
		this.postHtml += '</li>';

		if (this.lineNumber === this.totalNumberOfLines) {
			this.postHtml += '</ul>';
		}
	}

	displayAsHtml() {
		let r = '';

		if (this.codeBlockLines.length > 0) {
			r += this.preHtml;
			r += '[DELETETHIS]';
			r += '<li class="codeBlock">'
			if (qstr.linesContainCode(this.codeBlockLines)) {
				r += '<div class="codeBlock"><pre>';
			} else {
				r += '<div class="paragraphBlock"><pre>';
			}
			let i = 0;
			for (let line of this.codeBlockLines) {
				// qdev.debug('line', line);
				if (qstr.isEmpty(line)) {
					line = '&nbsp;';
				}
				const codeBlockNumberOfIndent = this.codeBlockNumberOfIndents[i];
				let actualCodeIndent = codeBlockNumberOfIndent - this.numberOfIndents;
				actualCodeIndent = actualCodeIndent < 0 ? 0 : actualCodeIndent;
				// r += `<div style="padding-left:${actualCodeIndent*20}px">${line}</div>`;
				const maskedLine = this.maskTheLine(line);
				r += `<div>${qstr.addPrecedingTabs(maskedLine, actualCodeIndent)}</div>`;
				i += 1;
			}
			r += '</pre></div>';
			// r += 'CODEBLOCK';
			// r += this.html;
		} else {
			r += this.preHtml;
			r += this.html;
		}
		r += this.getHtmlForImage();
		r += this.getHtmlForVideo();
		r += this.getHtmlForAnimation();
		r += this.postHtml;

		return r;
	}

	maskTheLine(line: string) {
		line = qstr.replaceAll(line, '<li>', 'CODEMARKER_OPEN_LI');
		line = qstr.replaceAll(line, '</li>', 'CODEMARKER_CLOSE_LI');
		line = qstr.replaceAll(line, '</ul>', 'CODEMARKER_CLOSE_UL');
		return line;
	}

	getHtmlForImage() {
		if (this.imageIdCode !== '') {
			return `<div><img class="outlineImage" src="${this.imagePathAndFileName}"/></div>`;
		}
		return '';

	}

	getHtmlForVideo() {
		if (this.videoIdCode !== '') {
			return `<div><iframe class="video" src="https://www.youtube.com/embed/${this.videoIdCode}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
		}
		return '';

	}

	getHtmlForAnimation() {
		if (this.animationIdCode !== '') {
			return `<div><img class="outlineImage" src="${this.animationPathAndFileName}"/></div>`;
		}
		return '';
	}

	parseButtonMarkers(text: string) {
		let r = text;
		// eslint-disable-next-line no-unused-vars
		r = qstr.replaceAllRegex(r, /\[\[(.*?)\]\]/i, (match: any, innerText: string, offset: any, string: string) => {
			return `<span class="standardOutlineButton">${innerText}</span>`;
		});
		return r;
	}

	parseForOutline() {
		let r = this.content;

		//mask for buttons
		r = qstr.replaceAll(r, '[[', 'BUTTON-MASK-BEGIN');
		r = qstr.replaceAll(r, ']]', 'BUTTON-MASK-END');

		// if there is a markdown for a url, then don't parse for raw urls, i.e. either/or
		if (!qstr.containsUrlMarkdown(r)) {
			r = qstr.parseMarkDown(r, {
				suppressParagraphMarks: true, suppressOrderedListElements: true
			});
			if (this.options.httpHighlightInCode) {
				// r = qstr.convertUrlsToLinkableUrls(r);
			}
			r = qstr.linkify(r);
		} else {
			r = qstr.parseMarkDown(r, {
				suppressParagraphMarks: true, suppressOrderedListElements: true
			});
		}

		//unmask for buttons
		r = qstr.replaceAll(r, 'BUTTON-MASK-BEGIN', '[[');
		r = qstr.replaceAll(r, 'BUTTON-MASK-END', ']]');

		// TODO: make this more sophisticated, since currently it will only not parse button markup if backtick is on the line anywhere, make it that it won't parse inside code text
		// if (!qstr.contains(this.line, '`')) {
		// if (!qstr.contains(this.line, '`') || qstr.contains(this.line, 'TAB')) {
		r = this.parseButtonMarkers(r);
		// }

		// NOTE: a single ` caused this to hang
		// while (r.includes("`")) {
		//     //     //r = r.replace(/`(.*?)`/i, '<code>$1</code>');
		// }

		r = qstr.replaceAllRegex(r, /`(.*?)`/i, (match: any, innerText: string, offset: any, string: string) => {
			return `<code>${innerText}</code>`;
		});

		// call all other parsing in separate methods here
		r = this.parseTextToHighlight(r);

		// r = 'AAA' + r + 'BBB';

		return r;
	}

	// <H|This is highlighted text.|H>
	parseTextToHighlight(r: string) {
		r = qstr.replaceAll(r, '&lt;H|', '<span class="outlineHighlight">');
		r = qstr.replaceAll(r, '|H&gt;', '</span>');
		return r;
	}
}

export default TextParserLine
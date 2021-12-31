import * as qstr from '../qtools/qstr';

class TextParser {

	body: string;

	lines: string[];

	constructor(body: string) {
		this.body = body;
		this.lines = qstr.convertStringBlockToLines(this.body, false);
	}

	parse() {
		// return 'parsed from base class';
	}
}

export default TextParser
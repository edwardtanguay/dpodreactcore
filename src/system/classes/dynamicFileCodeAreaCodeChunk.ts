import * as qstr from '../qtools/qstr';

// fixes VSCode variable-checking in other files (ts2451)
// export { };

class DynamicFileCodeAreaCodeChunk {

    public idCode: string;
    private numberOfPrecedingTabs: any[];
    private lines: string[];
	private dynamicCodeAreaObject: any;


    constructor(idCode: string, dynamicCodeAreaObject: any) {
        this.idCode = idCode;
        this.numberOfPrecedingTabs = [];
        this.lines = [];
		this.dynamicCodeAreaObject = dynamicCodeAreaObject;
    }

    addLine(fullLine: string) {
        const values = qstr.removeEndMarkerAndGetNumberOfPrecedingTabsAndLine(fullLine, this.dynamicCodeAreaObject.marker);
        const numberOfPrecedingTabs = values[0];
        const line = values[1];
        this.numberOfPrecedingTabs.push(numberOfPrecedingTabs);
        this.lines.push(line);
    }

    getPrecedingTabsOfFirstLine() {
        return this.numberOfPrecedingTabs[0];
    }

    addNewContent(numberOfPrecedingTabs: string[], lines: string[]) {
        this.numberOfPrecedingTabs = numberOfPrecedingTabs;
        this.lines = lines;
    }

    debugOutput() {
        console.log('      [' + this.idCode + ']');
        let index = 0;
        for (const line of this.lines) {
            const numberOfPrecedingTabs = this.numberOfPrecedingTabs[index];
            console.log('         (tab=' + numberOfPrecedingTabs + ') |' + line + '|');
            index++;
        }
    }

    getLinesForTemplateInsertion() {
        const newLines = [];
        let index = 0;
        for (const line of this.lines) {
            const numberOfPrecedingTabs = this.numberOfPrecedingTabs[index];
            let marker = '';
            if (index === 0) {
				marker = this.getFullEndMarker(this.idCode);
            }
			const choppedLine = qstr.chopRight(line, marker);
            const newLine = qstr.tabs(numberOfPrecedingTabs) + choppedLine + marker;
            newLines.push(newLine);
            index++;
        }
        return newLines;
    }

	getFullEndMarker(idCode: string) {
		// " // ::showcaseLodash"
		return this.dynamicCodeAreaObject.idCode === 'null' ? '' : `${this.dynamicCodeAreaObject.markerPrefix}::${idCode}${this.dynamicCodeAreaObject.markerSuffix}`;
	}

}

export default DynamicFileCodeAreaCodeChunk;
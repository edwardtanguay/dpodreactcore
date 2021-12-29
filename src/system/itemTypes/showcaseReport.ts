import Item from './item';

class ShowcaseReport extends Item {

    constructor() {
        super();
        this.itemObject = {
            title: 'initial title',
            description: 'initial description'
        }
    }

    get_title() {
        return this.itemObject.title;
    }
    
    get_description() {
        return this.itemObject.description;
    }
    
    displayAsHtml() {
        return `
        <div>
        This is a Showcase Report: "${this.get_title()}"
        </div>
        `;
    }

    debug() {
		console.log('SHOWCASE REPORT:');
		console.log(this.itemObject);
        console.log(`title: ${this.get_title()}`);
    }
}

export default ShowcaseReport;



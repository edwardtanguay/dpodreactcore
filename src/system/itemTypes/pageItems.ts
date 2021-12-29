import Items from './items';

class PageItems extends Items {

    itemTypeIdCode: string = 'pageItems';

	constructor(dql: string = '') {
		super(dql);
        this.initialize();
    }


}

export default PageItems;

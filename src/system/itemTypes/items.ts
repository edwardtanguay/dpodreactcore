import Item from './item';
const fs = require('fs');

class Items {

	protected itemObjects: any = [];
	protected items: any[] = [];
	protected itemTypeIdCode = '';
	protected jsonPathAndFileName: string = '';
	protected dql: string = '';

	constructor(dql: string = '') {
		this.dql = dql === '' ? 'all' : dql;
	}

	initialize() {
		this.jsonPathAndFileName = `src/system/data/json/itemType_${this.itemTypeIdCode}.json`;
	}

	async infuseWithData<T,U>(itemType: { new(): T }) {
		return new Promise(resolve => {
			(async () => {
				this.itemObjects = await this.getItemObjectsFromJsonFile();
				this.itemObjects.forEach((itemTypeObject:U) => {
					const item: T = new itemType();
					(item as unknown as Item).infuseWithItemObject<U>(itemTypeObject);
					this.items.push(item);
				})
				resolve(true);
			})();
		});
	}

	getItemObjectsFromJsonFile(): Promise<any> {
		return new Promise(resolve => {
			fs.readFile(`./${this.jsonPathAndFileName}`, 'utf-8', (err: any, rawData: any) => {
				const itemObjects = JSON.parse(rawData);
				resolve(itemObjects);
			});
		})
	}

	debug(): void {
		console.log(`itemTypeIdCode: "${this.itemTypeIdCode}"`);
		console.log(`number of items: ${this.items.length}`);
	}

	static async instantiateFromItemObjects<T, U, V>(itemsType: { new(): T }, itemType: { new(): U }, itemObjects: V[]): Promise<T> {
		return new Promise(resolve => {
			const items = new itemsType();
			(async () => {
				await (items as unknown as Items).infuseWithItemObjects<V>(itemObjects, () => {
					return new itemType();
				});
				resolve(items);
			})();
		})
	}

	infuseWithItemObjects<T>(itemObjects: T[], callback: any) {
		return new Promise(resolve => {
			itemObjects.forEach((itemObject: T) => {
				const item: Item = callback();
				item.infuseWithItemObject<T>(itemObject);
				this.items.push(item);
			});
			resolve(itemObjects);
		})
	}

	getItems<T>(): T[] {
		return this.items;
	}

	getItemObjects() {
		return this.items.map(item => item.getItemObject());

	}

	getItemWithIndex<T>(itemType: { new(): T }, index: number): Promise<T> {
		return new Promise((resolve, reject) => {
			resolve(this.items[index]);
		});
	}

	getItemWithId<T>(itemType: { new(): T }, id: number): Promise<T> {
		return new Promise((resolve, reject) => {
			const item = this.items.find(item => item.get_id() === id);
			resolve(item);
		});
	}

	exportAsXml() {
		// TODO: implement this
	}

	exportAsSqliteDatabase() {
		// TODO: implement this
	}

	exportAsExcelFile() {
		// TODO: implement this
	}

	exportAsDatapodDataFile() {
		// TODO: implement this
	}

	getCount() {
		return this.itemObjects.length;
	}

}

export default Items;
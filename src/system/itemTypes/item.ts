class Item {

	protected itemObject: any = {};

	get_id() {
		return this.itemObject.id;
	}

	get_systemWhenCreated() {
		return this.itemObject.systemWhenCreated;
	}

	get_systemWhoCreated() {
		return this.itemObject.systemWhoCreated;
	}

	getItemObject() {
		return this.itemObject;
	}

	debug() {
		console.log('item exists');
	}

	static async instantiateFromItemObject<T, U>(itemType: { new(): T }, itemObject: U): Promise<T> {
		return new Promise(resolve => {
			const item = new itemType() as unknown as Item;
			(async () => {
				item.infuseWithItemObject<U>(itemObject);
				resolve(item as unknown as T);
			})();
		})
	}

	infuseWithItemObject<T>(itemObject: T) {
		this.itemObject = itemObject;
	}

}

export default Item;
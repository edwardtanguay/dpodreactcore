const data10 = {
    a: 1,
    b: { c: { y: 8 } },
    d: 4,
    e: 6,
    f: { x: 5 },
    c: 1,
    g: { z: 11 },
};
const data11 = { c: 1, b: { c: { y: 9 } }, d: 4, e: 5, f: { x: 4 }, g: { z: 11 } };

const intersectionDeep = (obj1, obj2, entries = null, index = null, returnObj = null) => {

    // entry
    entries = Object.entries(obj1) ?? entries;
    index = index ?? 0;
    returnObj = returnObj ?? {};

    // process
    index++;

    // exit
    if (index < entries.length) {
        const property = entries[index][0];
        const value = entries[index][1];
        returnObj[property] = value;
        if (typeof value !== 'object') {
            return intersectionDeep(obj1, obj2, entries, index, returnObj);
        } else {
            return intersectionDeep(value, null);
        }
    } else {
        return returnObj;
    }
}

console.log(intersectionDeep(data10, data11));
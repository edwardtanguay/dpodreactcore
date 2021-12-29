const text = '92384 askjfsdf\n2\n52343jsdfjsfsdf';
const regex = /^[0-9].{5,}/gm;
const matches = text.match(regex);
console.log(matches);
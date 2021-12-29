
const text = 'This is a string with [3] and [1] also (22) and (2) and {23}';
// const regex = /[[(][0-9]*[\])]\sa/g;
const regex = /[[(]\d*[\])]\sa/g;
const matches = text.match(regex);

console.log(matches);
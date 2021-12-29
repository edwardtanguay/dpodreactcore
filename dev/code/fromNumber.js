const total = Math.floor(Math.random() * 20) + 1;
const numberArray = Array.from(Array(total).keys());
numberArray.forEach((number) => {
	console.log(`${number} stars: ${'*'.repeat(number)}`);
});
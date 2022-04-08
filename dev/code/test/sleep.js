const sleep = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

(async () => {
	console.log('one');
	await sleep(1000);
	console.log('two');
	await sleep(2000);
	console.log('four');
})();

sleep(5000).then(() => {
	console.log('five');
	sleep(1000).then(() => {
		console.log('six');
	});
});

import * as qstr from './qstr';

test('qstr.capitalizeFirstLetter() with uppercase works', () => {
	expect(qstr.capitalizeFirstLetter('This')).toBe('This');
	expect(qstr.capitalizeFirstLetter('this')).toBe('This');
});

test('qstr.forceCamelNotation() works', () => {
	expect(qstr.forceCamelNotation('The Test')).toBe('theTest');
	expect(qstr.forceCamelNotation('Test 0008')).toBe('test0008');
	expect(qstr.forceCamelNotation('ABC')).toBe('abc');
	expect(qstr.forceCamelNotation('Test-Page')).toBe('testPage');
	expect(qstr.forceCamelNotation('Abc$%^Def')).toBe('abcDef');
});
const { test, expect } = import '@jest/globals');

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});
const functions = require('./function');

test('Add 2 + 2 equals 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

test('Multiply 2 * 4 equals 8', () => {
    expect(functions.multiply(2,4)).toBe(8);
});
const functions = require('./function');

test('Add 2 + 2 equals 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

test('Multiply 2 * 4 equals 8', () => {
    expect(functions.multiply(2,4)).toBe(8);
});

test('Multiply 2 * 4 does not equal 9', () => {
    expect(functions.multiply(2,4)).not.toBe(9);
});

// toBeNull
test('isNull will be Null', () => {
    expect(functions.isNull()).toBeNull();
});

test('checkValue of undefined will be falsy', () => {
    expect(functions.checkValue(undefined)).toBeFalsy();
});

//reference type vs. value type
test('createUser should return default user', () => {
    expect(functions.createUser()).toStrictEqual({
      firstName: 'Sepehr',
      lastName: 'Pakbaz'
    });
});
const functions = {
    add: (num1, num2) => num1 + num2 ,
    multiply: (num1, num2) => num1 * num2,
    isNull: () => null,
    checkValue: x => x,
    createUser: () => {
        //returns object not primitive value
        return { firstName: 'Sepehr', lastName: 'Pakbaz' };
    },
}

module.exports = functions;
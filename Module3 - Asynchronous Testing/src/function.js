const axios = require('axios');

const functions = {
    add: (num1, num2) => num1 + num2 ,
    multiply: (num1, num2) => num1 * num2,
    isNull: () => null,
    checkValue: x => x,
    createUser: () => {
        //returns object not primitive value
        return { firstName: 'Sepehr', lastName: 'Pakbaz' };
    },
    compileJavaCode: () => {
        throw new Error('you are using the wrong JDK');
    },
  fetchUser: () =>
    axios
      .get('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.data)
      .catch(err => 'error')
}

module.exports = functions;
# Module3 - Asynchronous Testing

## Objectives

* Connect and retieve data from API
* Perform asynchronous testing
* Setup and teardown for multi-stage testing

## Requirements

* Complete [Module 2 of Jest 101 Tutorial](https://github.com/pakbaz/Jest101Training/tree/master/Module2%20-%20Exploring%20Jest%20Assertion%20Library)

## Instruction

1. We will continue where we left off from module 2. Let's install **"axios"** which is an easy to use http client  

    ```console
    npm i axios
    ```

    > axios is [open source](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js

2. Lets just grab some data from an open API <https://jsonplaceholder.typicode.com> and then update our function.js to fetch the data we want using axios client:

    ```javascript
    const axios = require('axios');

    fetchUser: () =>
        axios
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.data)
        .catch(err => 'error')

    ```

    > axios returns a promise which essentially turn this function into an asynchronous function. `then` keywork fulfil the promise upon data retrieval and `catch` will throw error if network failure happens

3. For testing it as is, we can simply use the concept of JavaScript promise to test that:

    ```javascript
    // Promise
    test('fetchUser should return a user with the name of Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser().then(data => {
        expect(data.name).toEqual('Leanne Graham');
    });
    });
    ```

    > the reason we put in `expect.assertions(1);` is to verify that a certain number of assertions are called. Otherwise a fulfilled promise would not fail the test.  

4. Previous test which was promise based, might fail intermittently due to timeout limit. Also, it is not a good practice to run asynchronous test like that anyway. Instead we use `async` and `await` keyword:

    ```javascript
    // Async Await
    test('fetchUser should return a user with the name of Leanne Graham', async () => {
        expect.assertions(1);
        const data = await functions.fetchUser();
        expect(data.name).toEqual('Leanne Graham');
    });
    ```

    > you might be familiar with `async` and `await` keyword if you have experience with programming languages like **C#** and it works very similarly here.

### Reference

* [Jest Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
* [Setup and Teardown](https://jestjs.io/docs/en/setup-teardown)
  
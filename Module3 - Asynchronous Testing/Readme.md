# Module3 - Asynchronous Testing

## Objectives

* Connect and retieve data from API
* Perform asynchronous testing
* Setup and teardown for scoped testing
* Isolating tests

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

    **Important:**
    >It is very important to know in unit testing we shouldn't test external dependencies or third party code which is what we do here. This is for learning purposes but in next module we will learn how to Mock these external dependencies and instead of testing backend API, network stack and third party library axios we should only test logic in our function which is handling and transforming data coming from API and retrieved by third party library axios. 

5. Next thing is to prepare for the test or setup and teardown before and after of each or all tests. `beforeAll` , `afterAll` , `beforeEach` and `afterEach` can be very useful for things like setting up mock objects for the test suite or copy or clean some temporary data for running the tests. Additionally, we can scope and group the tests inside each suite using `describe` similar to jasmine framework. `describe` can exist next to other tests, can be nested and is very useful for grouping as jest executes all describe handlers in a test file before it executes any of the actual tests. This is another reason to do setup and teardown inside **before** and **after** handlers rather than inside the describe blocks. Once the describe blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.

    ```javascript
    describe('scoped described test sets', () => {
        beforeAll(() => console.log('beforeAll'));
        afterAll(() => console.log('afterAll'));
        beforeEach(() => console.log('beforeEach'));
        afterEach(() => console.log('afterEach'));
        test('log test', () => console.log('test1'));
        test('trivial bool check', () => {
            console.log('test2')
            expect(true).toBe(true);
        });
    });
    ```

    > for more example and nested scope execution order refer to offical documentation (setup and teardown link in references)

6. If for whatever reason a test is failing and you want to isolate a test, one of the first things to check should be whether the test is failing when it's the only test that runs. To run only one test with Jest, temporarily change that test command to a test.only:

    ```javascript
    test.only('isolated test',() =>{
        console.log('isolated test')
        expect(true).toBe(true);
    });
    ```

    > note that using `.only` will not bypass before and after tests for the scope it belongs to but it will make all other tests from the same scope or other scopes in the same suite to be skipped 

### Reference

* [Jest Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
* [Setup and Teardown](https://jestjs.io/docs/en/setup-teardown)
  
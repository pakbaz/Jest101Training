# Module4 - Mocking

## Objectives

* Using Jest Mocking framework
* Stubs and Mocks
* Unit Testing API Call

## Requirements

* Complete [Module 3 of Jest 101 Tutorial](https://github.com/pakbaz/Jest101Training/tree/master/Module3%20-%20Asynchronous%20Testing)

## Instruction

 As mentioned, calling asynchronous external API during unit test is against all the guidelines and general rules and philosophy of unit testing in general. Additionally, it has teremendous disadvantages such as unwanted behaviros, long running tasks, network congestions and creation of unwanted records in remote service or database. Therefore, we need to find a way to bypass calling external services while thoroughly unit testing all modules and business logic in code. For this reason we use something called test doubles or mocks.

 Mock functions are also known as **"spies"**, because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output. You can create a mock function with `jest.fn()`. If no implementation is given, the mock function will return *undefined* when invoked.

1. Continue where we left off from module 3, First lets install babel (if you haven't installed it already back in module 1 optional step) To add ES6 support so we can write classes, you must install `Babel` library. you need to install babel by running:

    ```console
    npm i -D @babel/core @babel/preset-env @babel/register
    ```

    Then you need to configure babel by creating babel.config.js file:

    ```javascript
    // babel.config.js
    module.exports = {
        presets: [
        [
            '@babel/preset-env',
            {
            targets: {
                node: 'current',
            },
            },
        ],
        ],
    };
    ```

2. Create two new files called `mock.js` and `mock.test.js` and create a function that take a function as an input (external dependency). Then, we mock that input function and perform assertions on it

    ```javascript
    export default class Mocks {

        greetWorld(greettingFn) {
            return greettingFn('world');
        }
    }
    ```

    ```javascript
    //mocking example for a higher order function
    it('greetWorld should call the greeting function properly', () => {
        //Arrange
        const greetImplementation = name => `Hello, ${name}!`;
        const mockFn = jest.fn(greetImplementation);
        //Act
        const value = greetWorld(mockFn);
        //Assert
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('world');
        expect(value).toBe('Hello, world!');
    });
    ```

    > `jest.toBeCalled()` and `jest.toHaveBeenCalled()` are aliases of each other.  

3. Now let's add couple of real API calls to our class to try out stubs and Spy. first, let's import axios to our Mocks class by adding:

    ```javascript
    import axios from 'axios';
    ```

    Then let's add couple of asynchronous method to our class:

    ```javascript
    async getPostById(postId)  {
        const response =
            await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    id : postId
                }

            });

        return response.data;
    }

    async getPostsCountByUserId(userId) {
        const response =
            await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    userId : userId
                }

            });

        return response.data.length;
    }
    ```

4. Let's implement couple of tests for our API. to make sure we are implement our `Spy` function correctly, let's test the real API first (which is not the best practice but we do it only for educational purpose)

    ```javascript
    //Calls real API to fetch first post
    it("getPostById should return post with the id of 1 when 1 is passed - API", async () => {
        //Arrange
        const m = new Mocks();
        //Act
        const post = await m.getPostById(1);
        //Assert
        expect.assertions(3);
        expect(post).not.toBeNull();
        expect(post[0].id).toBe(1);
        expect(post[0].title).not.toBe("fake");
    });
    ```

    This test calls the real function and should pass the test with multiple assertions.

5. As we know, to test a function that has hard dependency on an external or internal module, we must create a *Mock* or *Stub*. since dependency is not properly injected we have no choice but to bypass external API call. For that we must use **`Spy`** which is in the category of stubs. to use spy functionality in Jest we can use **`spyOn()`** function. Essentially, we want to fake axios get method. its important to properly set up and tear down our spy setup because it will override axios's real functionality globally if we don't restore it to normal. In addition, we need a fake dataset that looks like a real one for unit test. In our test suite We add:

    ```javascript
    let axiosGetSpy;
    let mockPost =
        [{
            userId: 1,
            id: 1,
            title: 'fake',
            body: 'fake'
        }
        ];
    beforeEach(()=> axiosGetSpy = jest.fn());
    afterEach(() => {
        axiosGetSpy.mockRestore();
    });
    ```

    Now we can add our unit test with Spy:

    ```javascript
    //Uses Spy to double axios very first post
    it("getPostById should return post with the id of 1 when 1 is passed - Spy", async () => {
        //Arrange
        const m = new Mocks();

        axiosGetSpy = jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({data: mockPost}));

        //Act
        const post = await m.getPostById(1);

        //Assert
        expect.assertions(3);
        expect(post).not.toBeNull();
        expect(post[0].id).toBe(1);
        expect(post[0].title).toBe("fake");
    });
    ```

    This is a powerful feature that let you substitude any external or internal dependency with a mock object to test different aspects in your code block

6. Another way we can take advantage of this powerful feature is to create a stub for a result of an external API without using fake object. Add this to your test suite:

    ```javascript
    //Uses Spy to stub an external API without creating fake
    it("getPostsCountByUserId should return correct posts count", async () => {
        //Arrange
        const m = new Mocks();

        axiosGetSpy = jest.spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({data: new Array(5)}));

        //Act
        const postsCount = await m.getPostsCountByUserId(1);

        //Assert
        expect.assertions(2);
        expect(postsCount).not.toBeNull();
        expect(postsCount).toBe(5);
    });
    ```

### Reference

* [Mock Functions](https://jestjs.io/docs/en/mock-functions)
* [Mock Functions API](https://jestjs.io/docs/en/mock-function-api)
* [ES6 Class Mock](https://jestjs.io/docs/en/es6-class-mocks)

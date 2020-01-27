# Module4 - Mocking

## Objectives

* Using Jest Mocking framework
* Stubs and Mocks
* Unit Testing API Call

## Requirements

* Complete [Module 3 of Jest 101 Tutorial](https://github.com/pakbaz/Jest101Training/tree/master/Module3%20-%20Asynchronous%20Testing)

## Instruction

1. Continue where we left off from module 3, as mentioned, calling asynchronous external API during unit test is against all the guidelines and general rules and philosophy of unit testing in general. Additionally, it has teremendous disadvantages such as unwanted behaviros, long running tasks, network congestions and creation of unwanted records in remote service or database. Therefore, we need to find a way to bypass calling external services while thoroughly unit testing all modules and business logic in code. For this reason we use something called test doubles or mocks. Mock functions are also known as **"spies"**, because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output. You can create a mock function with `jest.fn()`. If no implementation is given, the mock function will return *undefined* when invoked. create a new file called mock.test.js and create a function that take a function as an input (external dependency). Then, we mock that input function and perform assertions on it

    ```javascript
    function greetWorld(greettingFn) {
        return greettingFn('world');
    }

    //stub example
    test('greetWorld should call the greeting function properly', () => {
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

2. There are several ways to create mock functions. The `jest.fn` method allows us to create a new mock function directly. If you are mocking an object method, you can use `jest.spyOn`. And if you want to mock a whole module, you can use `jest.mock`.



### Reference

* [Mock Functions](https://jestjs.io/docs/en/mock-functions)
* [Mock Functions API](https://jestjs.io/docs/en/mock-function-api)
* [ES6 Class Mock](https://jestjs.io/docs/en/es6-class-mocks)
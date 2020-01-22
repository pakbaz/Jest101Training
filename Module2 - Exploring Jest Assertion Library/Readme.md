# Module2 - Exploring Jest Assertion Library

## Objectives

* Explore assertion library of Jest
* Regular expression Test
* Exception handling

## Requirements

* Complete [Module 1 of Jest 101 Tutorial](https://github.com/pakbaz/Jest101Training/tree/master/Module1%20-%20Getting%20Started%20with%20Jest)

## Instruction

1. We will continue from module 1 and add to those function and function.test js files. For Continous running of our test we can open integrated terminal in vscode and run following command:

    ```console
    npm test -- --watch
    ```

    > -- will escape and pass --watch as parameter to the command defined in test which will eventually run **jest --watch**

2. Lets add more functions to our function.js file:

    ```javascript
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
    ```

    Now lets write the unit test for each od these added functions

3. First thing we can check is **"not"** modifier using fluent api. for example if we want to have another unit test for multiply function for what we don't expect it to be we can add following method:

    ```javascript
    test('Multiply 2 * 4 does not equal 9', () => {
        expect(functions.multiply(2,4)).not.toBe(9);
    });
    ```

4. To Check for null there is an assertion method called *toBeNull()* Lets write the test for isNull Function:

    ```javascript
    // toBeNull
    test('isNull will be Null', () => {
        expect(functions.isNull()).toBeNull();
    });
    ```

5. Falsy value can be also evaluated similarly:

    ```javascript
    test('checkValue of undefined will be falsy', () => {
        expect(functions.checkValue(undefined)).toBeFalsy();
    });
    ```

6. For more complex types aka Object types or reference types *toBe()* method will not work. We can Try:

    ```javascript
    //reference type vs. value type
    test('createUser should return default user', () => {
        expect(functions.createUser()).toBe({
        firstName: 'Sepehr',
        lastName: 'Pakbaz'
        });
    });
    ```

    If we have setup jest in watch mode immediately after saving we get an error running the test suite and test fails with an error Object equality. it even suggests what we should do to fix it:
    > If it should pass with deep equality, replace "toBe" with "toStrictEqual"

    To fix this we should either replace toBe() function with *toEqual()* or as suggested *toStrictEqual()* for good measures. Therefore it will be:

    ```javascript
    //reference type vs. value type
    test('createUser should return default user', () => {
        expect(functions.createUser()).toStrictEqual({
        firstName: 'Sepehr',
        lastName: 'Pakbaz'
        });
    });
    ```

7. For values comparison there are many methods that can be used from assetion library. for example we can add something like this:

    ```javascript
    // Less than and greater than
    test('Should be under 1600', () => {
        const load1 = 800;
        const load2 = 800;
        expect(load1 + load2).toBeLessThanOrEqual(1600);
    });
    ```

8. For regular expression we can match part of a string or whole string with a pattern or characters and for that we use *"toMatch()"* method, we can also combine **"not"** modifier with it:

    ```javascript
    test('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    test('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/);
    });
    ```

9. For arrays, we can use *"toContain()"* method for checking a member:

    ```javascript
    // Arrays
    test('Admin should be in usernames', () => {
        usernames = ['john', 'karen', 'admin'];
        expect(usernames).toContain('admin');
    });
    ```

10. For handling exception let's create another method in our function.js called *compileJavaCode()* :

    ```javascript
    compileJavaCode: () => {
        throw new Error('you are using the wrong JDK');
    }
    ```

for testing this function let's create a multi assertion unit test as below in function.test.js

```javascript
//exception handling
test('compiling android goes as expected', () => {
    expect(functions.compileJavaCode).toThrow();
    expect(functions.compileJavaCode).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(functions.compileJavaCode).toThrow('you are using the wrong JDK');
    expect(functions.compileJavaCode).toThrow(/JDK/);
});
```

### Reference

* [Jest Matchers Documentation](https://jestjs.io/docs/en/using-matchers.html)
  
# Module1 - Getting Started with Jest

## Objectives

* Setup environment
* Create and run a simple unit test
* Explore TDD in simplest form

## Requirements

* Node.js and Package Manager - [Node.js](https://nodejs.org/)
* Code Editor - [Visual Studio Code](https://code.visualstudio.com/)

## Instruction

1. Make sure you have node and vscode installed and environment path is setup correctly
2. Open a console or terminal. Create an empty directory

    ```console
    mkdir src
    cd .\src\
    ```

3. Cteate a local folder and initialize npm

    ```console
    npm init -y
    ```

    > **-y** is for accepting all default values.

4. Open using VSCode

    ```console
    code .
    ```
  
    You should see package.json which is the node.js configuration

5. Install and configure Jest

    ```console
    npm i -D jest
    ```

    >**-D** is short for --save-dev  
    >**i** is short for install  
    >use **-g** if you want to install globally  

    Now Change test script in package.config to "jest"

    ```json
    ...
    "scripts": {
        "test": "jest"
    },
    ...
    ```

6. If you want to group all tests into a test module all you have to do to is to wrap our test in a container function called *describe* which represent a test suite. it privides grouping and represent behavior-driven testing:

    ```javascript
    describe('Math functions', () => {

    });
    ```

7. Create a function for simple logic to test

    Create new function.js file in the folder to write some logic to test

    ```javascript
    const functions = {
        add: function(num1,num2){
            return num1 + num2;
        }
    }
    ```

    Notice for add function, there is a shorter/cleaner/simpler way using arrow functions that was introduced in ES6:

    ```javascript
    const functions = {
        add: (num1, num2) => num1 + num2
    }
    ```

    Make sure export the module:

    ```javascript
    module.exports = functions;
    ```

8. Write unit test for the function we just wrote

    Create new function.test.js file in the same folder to write the test for function.js
    > convention is to append *.test* for **jest** just like *.spec* for **jasmine**

    Reference our functions in the test file using:

    ```javascript
    const functions = require('/functions');
    ```

    and write out unit test:

    ```javascript
    test('Add 2 + 2 equals 4', () => {
        expect(functions.add(2,2)).toBe(4);
    });
    ```

    >**it** is an alias for **test** but since other JavaScript unit testing frameworks use **it** instead we will be using **it** not **test** so it becomes:

    ```javascript
    it('Add 2 + 2 equals 4', () => {
        expect(functions.add(2,2)).toBe(4);
    });
    ```
  
    Run our test using:

    ```console
    npm test
    ```

    We see that the test runner finds our test and it passes.

9. Now let's write another test for multiplication using TDD approach:

    ```javascript
    it('Multiply 2 * 4 equals 8', () => {
        expect(functions.multiply(2,4)).toBe(8);
    });
    ```

    Now running test again will fail because won't have function yet. so we write our multiply function next. (we can intentionally write a bad one to test how it fails again)

    Eventually our function.js should look like this:

    ```javascript
    const functions = {
        add: (num1, num2) => num1 + num2 ,
        multiply: (num1, num2) => num1 * num2
    }

    module.exports = functions;
    ```

    if we run the test again it will pass

10. **Optional:** If you want to use ES6 syntax and modules, you must install `Babel` library. you need to install babel by running:

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

### Reference

* [Jest Getting Started Documentation](https://jestjs.io/docs/en/getting-started)

const functions = require('./function');
describe('Math functions', () => {
        
    it('Add 2 + 2 equals 4', () => {
        expect(functions.add(2,2)).toBe(4);
    });

    it('Multiply 2 * 4 equals 8', () => {
        expect(functions.multiply(2,4)).toBe(8);
    });

    it('Multiply 2 * 4 does not equal 9', () => {
        expect(functions.multiply(2,4)).not.toBe(9);
    });

    // toBeNull
    it('isNull will be Null', () => {
        expect(functions.isNull()).toBeNull();
    });

    it('checkValue of undefined will be falsy', () => {
        expect(functions.checkValue(undefined)).toBeFalsy();
    });

    //reference type vs. value type
    it('createUser should return default user', () => {
        expect(functions.createUser()).toStrictEqual({
        firstName: 'Sepehr',
        lastName: 'Pakbaz'
        });
    });

    describe('scoped described test sets', () => {
        beforeAll(() => console.log('beforeAll'));
        afterAll(() => console.log('afterAll'));
        beforeEach(() => console.log('beforeEach'));
        afterEach(() => console.log('afterEach'));
        it('log test', () => console.log('test1'));
        it('trivial bool check', () => {
            console.log('test2')
            expect(true).toBe(true);
        });
        // //running this test will make other tests to be skipped
        // test.only('isolated test',() =>{
        //     console.log('isolated test')
        //     expect(true).toBe(true);
        // });
    });

    // Less than and greater than
    it('Should be under 1600', () => {
        const load1 = 800;
        const load2 = 800;
        expect(load1 + load2).toBeLessThanOrEqual(1600);
    });

    //regex
    it('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    it('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/);
    });

    // Arrays
    it('Admin should be in usernames', () => {
        usernames = ['john', 'karen', 'admin'];
        expect(usernames).toContain('admin');
    });

    //exception handling
    it('compiling android goes as expected', () => {
        expect(functions.compileJavaCode).toThrow();
        expect(functions.compileJavaCode).toThrow(Error);
    
        // You can also use the exact error message or a regexp
        expect(functions.compileJavaCode).toThrow('you are using the wrong JDK');
        expect(functions.compileJavaCode).toThrow(/JDK/);
    });

    // Working with async data

    // // Promise
    // it('fetchUser should return a user with the name of Leanne Graham', () => {
    //   expect.assertions(1);
    //   return functions.fetchUser().then(data => {
    //     expect(data.name).toEqual('Leanne Graham');
    //   });
    // });

    // Async Await
    it('fetchUser should return a user with the name of Leanne Graham', async () => {
        expect.assertions(1);
        const data = await functions.fetchUser();
        expect(data.name).toEqual('Leanne Graham');
    });
});
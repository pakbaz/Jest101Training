import Mocks from './mock';
import axios from 'axios';


describe('Testing Mocks class', () => {
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
  //mock example
  it('greetWorld calls the greeting function properly', () => {
    //Arrange
    const m = new Mocks();
    const greetImplementation = name => `Hello, ${name}!`;
    const mockFn = jest.fn(greetImplementation);
    //Act
    const value = m.greetWorld(mockFn);
    //Assert
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('world');
    expect(value).toBe('Hello, world!');
  });

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

  //
});
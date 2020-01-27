import axios from 'axios';

export default class Mocks {
    constructor(){
        console.log("Mocks class inititialized");
    } 

    greetWorld(greettingFn) {
        return greettingFn('world');
    }

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
    
    async getPostsByUserId(userId) {
        const response = 
            await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    userId : userId
                }

            });

        return response.data;
    }
}
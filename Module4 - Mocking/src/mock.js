import axios from 'axios';

const mocks = { 
    greetWorld: (greettingFn) => greettingFn('world'),
    getPostById: async (postId) => {
        const response = 
            await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    id : postId
                }

            });

        return response.data;
    },
    getPostsByUserId: async (userId) => {
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

export default mocks;
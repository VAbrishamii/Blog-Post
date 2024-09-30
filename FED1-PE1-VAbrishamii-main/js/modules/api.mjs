export const Base_URL = 'https://v2.api.noroff.dev/';

export const Auth_endpoint = {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    API_KEY:'auth/create_api_key'
};

export const Blog_endpoint ={
    POST_BY_USER: (name) => `blog/posts/${name}`,
    POST_BY_ID: (name, id) => `blog/posts/${name}/${id}`,

};

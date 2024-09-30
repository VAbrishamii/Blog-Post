import { Base_URL, Blog_endpoint } from "./api.mjs";

export async function singlePost(name,id){ 

    const url = `${Base_URL}${Blog_endpoint.POST_BY_ID(name,id)}`;
    console.log('url', url)
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('failed to fetch');

        }
        const post = await response.json();
        return post;
    }catch (error){
        throw error;
    }
}


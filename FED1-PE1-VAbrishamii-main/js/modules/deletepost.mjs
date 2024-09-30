import { Base_URL, Blog_endpoint } from "./api.mjs";


export async function deletePost(name, id) {
   
    const accessToken = localStorage.getItem("token");
    const url = `${Base_URL}${Blog_endpoint.POST_BY_ID(name, id)}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        window.location.reload();
        return 
    } catch (error) {
        throw error;
    }
}

import { Base_URL, Blog_endpoint } from "./api.mjs";
import { createForm } from "../pages/update.mjs";;
import { createNavbar } from "../pages/navbar.mjs";
import { createFooter } from "../pages/footer.mjs";

async function main() {
    createNavbar('container');
  
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const postName = urlParams.get('name');

    createForm(postName,postId);
    createFooter();
    
}


export async function updatePost(name,id, title,imageURL,body){

    const formData = {
        title: title,
        media: {url:imageURL },
        body: body,
    };

    try{
        const accessToken = localStorage.getItem("token");
        const updateUrl = `${Base_URL}${Blog_endpoint.POST_BY_ID(name, id)}`;
        const response = await fetch (updateUrl,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(formData)


        });
   
        if (!response.ok){
            throw new Error ('Failed to update post');
        }
 
        alert('Post updated successfully!');
        window.location.href = `../post/edit.html?id=${id}&name=${name}`;

    }catch(error){
        alert('Failed to update post. Please try again.');
    }
}

main();



import { pageLoading, removeLoader } from "../modules/loader.mjs";
import { singlePost } from "../modules/singlepost.mjs";
import { createFooter } from "./footer.mjs";
import { createNavbar } from "./navbar.mjs";

async function makePage(){
    createNavbar('container');
    createFooter();
    pageLoading();
    setTimeout(removeLoader,200);
    displayPostFromUrlParams();
}



export async function displaySinglePost(postName, postId) {
    try {
        const post = await singlePost(postName, postId);

        if (!post || !post.data) {
            throw new Error('Invalid post data');
        }

        const postData = post.data;

        const singlePostContent = document.getElementById('single-post');
        singlePostContent.innerHTML = '';

        const postContent = `
           <div class= 'single-post'>
            <h1>${postData.title}</h1>
            <img src="${postData.media.url}" alt="${postData.title}">
            <p id="postBody"></p>
            <p>Author: ${postData.author.name}</p>
            <p>Published Date: ${postData.created}</p>
            <i class="fa-solid fa-share-nodes share"></i>
           <div>
        `;
        singlePostContent.innerHTML = postContent;

        const postBody = singlePostContent.querySelector('#postBody');
        postBody.innerText = postData.body; 
        
        const shareLink = singlePostContent.querySelector('.share');
        shareLink.addEventListener('click', async () => {
            const postUrl = window.location.href;
            try {
                await navigator.share({ url: postUrl });
            } catch (error) {
                console.error('Error sharing post:', error);
        
            }
        });
    } catch (error) {
        console.error('Error sharing post:', error);
     
    }

}


export async function displayPostFromUrlParams() {
        try {
            const params = new URLSearchParams(window.location.search);
            const postId = params.get('id');
            const postName = params.get('name');
    
            if (!postId || !postName) {
                throw new Error('Post ID or name missing from URL parameters');
            }
    
            await displaySinglePost(postName, postId);
        } catch (error) {
            console.error('Error displaying post from URL parameters:', error);
        
        }
    }
    
    
   
    makePage();
  
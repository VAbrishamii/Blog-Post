import { allPost } from "../modules/allpost.mjs";
import { createFooter } from "./footer.mjs";
import { createNavbar } from "./navbar.mjs";
import { deletePost } from "../modules/deletepost.mjs";

createNavbar('container');



export function editPostPage() {
    const renderPosts = (posts, containerId) => {
        const container = document.getElementById(containerId);

        if (!Array.isArray(posts.data)) {
            console.error('Data array not found:', postsData);
            return;
        }

        posts.data.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const image = document.createElement('img');
            image.src = post.media.url;
            image.alt = post.title;
            image.id = 'image';

            const title = document.createElement('h2');
            title.textContent = post.title;
            title.id = 'title';

            const editIcon = document.createElement('i');
            editIcon.className = 'fa-regular fa-pen-to-square';

            editIcon.addEventListener('click', ()=>{
                const postId = post.id;
                const postName = post.author.name; 
                window.location.href = `../post/update.html?id=${postId}&name=${postName}`;
            });

        
            const trashIcon = document.createElement('i');
            trashIcon.className = 'fa-regular fa-trash-can';
            trashIcon.addEventListener('click', () => {
                const confirmDelete = confirm('Are you sure you want to delete this post?');
                if (confirmDelete) {
                    deletePost(post.author.name, post.id); 
                }
            });

            postDiv.appendChild(image);
            postDiv.appendChild(title);
            container.appendChild(postDiv);
            
            const iconContainer = document.createElement('div');
            iconContainer.classList.add('icon-container'); 
            iconContainer.appendChild(editIcon);
            iconContainer.appendChild(trashIcon);
            postDiv.appendChild(iconContainer);
        });
    }

    return { renderPosts };
}

async function displayPost (){
    try{
        const posts = await allPost();
        const render = editPostPage();
        render.renderPosts(posts, 'post-container');

    }catch (error){
        console.log('error displaying posts', error);
    }
   
}



displayPost();
createFooter();
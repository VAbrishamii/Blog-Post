import { Base_URL, Blog_endpoint } from "../modules/api.mjs";
import { createFooter } from "./footer.mjs";
import { createNavbar } from "./navbar.mjs";

createNavbar('container');
createFooter



const createBlogForm = () => {
    const main = document.querySelector("main");

    // Get user information from local storage
    const userInfoString = localStorage.getItem("userInfo");
    const accessToken = localStorage.getItem("token");
    const userInfo = JSON.parse(userInfoString);
    const name = userInfo ? userInfo.data.name : null;

    //create form
    const form = document.createElement("form");
    form.className = "blog-form";
  
    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Title:";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.name = "title";
    
    const imageLabel = document.createElement("label");
    imageLabel.innerText = "Image URL:";
    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.id = "image";
    imageInput.name = "image";

    const textLabel = document.createElement("label");
    textLabel.innerText = "Blog Text:";
    const textInput = document.createElement("textarea");
    textInput.id = "text";
    textInput.name = "text";

    const tagsLabel = document.createElement("label");
    tagsLabel.innerText = "Tags:";
    const tagsInput = document.createElement("input");
    tagsInput.type = "text";
    tagsInput.id = "tags";
    tagsInput.name = "tags";
    tagsInput.placeholder = "Enter tags separated by commas";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = 'buttonDiv';
    const submitButton = document.createElement("button");
    submitButton.classList.add('blue-btn');
    submitButton.type = "submit";
    submitButton.innerText = "Save";

    const cancleButton = document.createElement("button");
    cancleButton.classList.add('btn');
    cancleButton.type = "reset";
    cancleButton.innerText = "Decline";

    form.append(titleLabel, titleInput,  imageLabel, imageInput, textLabel, textInput,tagsLabel, tagsInput, buttonsContainer);
    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancleButton);
    
  
    // Add submit event listener to form
    const createBlogPost = async (event) => { 
      event.preventDefault();
      const title = titleInput.value;
      const text = textInput.value;
      const image = imageInput.value;
      const tags = tagsInput.value.split(',').map(tag => tag.trim()); 

      if (!title || !text || !image || !tags) {
        alert('Please fill in all fields.');
        return;
      }

    try{

       
    const postData = {
      title,
      body: text,
      media: {
        url: image,
        alt: 'Blog image'
      },
      tags,
      author: name
    };
    

    // Send POST request to create blog post
    const blogPostUrl = `${Base_URL}${Blog_endpoint.POST_BY_USER(name)}`;
    console.log('url', blogPostUrl);
    const blogPostOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + accessToken,
       
      },
      body: JSON.stringify(postData)
    };
    
    if (!userInfo) {
      alert('Please log in to publish a blog post.');
     return;
     }

    console.log('Request Headers:', blogPostOptions);

      const blogPostResponse = await fetch(blogPostUrl, blogPostOptions);
      console.log('response', blogPostResponse);
      if (blogPostResponse.ok) {
        displayPreview(postData, name);
     
        titleInput.value = '';
        textInput.value = '';
        imageInput.value = '';
        tagsInput.value = '';
      } else {
        alert('Failed to create blog post. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred while processing your request. Please try again later.');
    }
  };

  form.addEventListener("submit", createBlogPost);

  form.addEventListener("reset", () => {
    titleInput.value = '';
    textInput.value = '';
    imageInput.value = '';
    tagsInput.value = '';
    window.location.href = '../post/edit.html';
  })
 
  main.appendChild(form);
  return form;

};


const previewSection = () => {
  const main = document.querySelector("main");
  const preview = document.createElement("div");
  preview.className = "previewDiv";
  const previewTitle = document.createElement('h2');
  previewTitle.innerText = 'Preview';
  preview.appendChild(previewTitle);
  const previewSection = document.createElement("div");
  previewSection.className = "preview-section";
  preview.appendChild(previewSection);
  main.appendChild(preview);
  return preview;
};

const displayPreview = (postData, name) => {
  const previewSection = document.querySelector(".preview-section");

  previewSection.innerHTML = ""; 
  const title = document.createElement("h2");
  title.innerText = postData.title;
  const image = document.createElement("img");
  image.src = postData.media.url;
  image.alt = postData.media.alt;
  const text = document.createElement("p");
  text.innerText = postData.body;
  const auther = document.createElement('p');
  auther.className = 'auther';
  auther.innerText = 'Published By: ' + name;
 
  previewSection.append(title, image, text, auther);
};

const form = createBlogForm();
const preview = previewSection();
const main = document.querySelector("main");
main.appendChild(form);
main.appendChild(preview);


  
  
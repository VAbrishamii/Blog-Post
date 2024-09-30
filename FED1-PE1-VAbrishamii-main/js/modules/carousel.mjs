
import { createCarouselInner, createNextButton, createPrevButton } from "../pages/index.mjs";
import { Base_URL, Blog_endpoint } from "./api.mjs";


let currentPage = 1;
let latestPosts = [];

export async function createCarousel() {
    const main = document.querySelector('main');

    const title = document.createElement('div');
    title.classList.add('home-title');
    title.innerHTML="Recent Posts";
    main.appendChild(title);
 

    const carousel = document.createElement('div');
    carousel.id = 'carousel';
    carousel.classList.add('carousel');

    carousel.appendChild(createPrevButton());
    carousel.appendChild(createCarouselInner());
    carousel.appendChild(createNextButton());

    main.appendChild(carousel);
    
    await fetchLatestPosts();

    document.getElementById('nextBtn').addEventListener('click', async () => {
        currentPage++;
        if (currentPage > latestPosts.length) {
            currentPage = 1;
        }
        updateCarousel();
    });

    document.getElementById('prevBtn').addEventListener('click', async () => {
        currentPage--;
        if (currentPage < 1) {
            currentPage = latestPosts.length;
        }
        updateCarousel();
    });
}

async function fetchLatestPosts() {
    let name = 'Vahideh';
       
    try {
        const url = `${Base_URL}${Blog_endpoint.POST_BY_USER(name)}`;
        console.log('url',url);
        const response = await fetch(url);
        console.log('response', response);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const responseData = await response.json();
        const posts = responseData.data || responseData;

        posts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        latestPosts = posts.slice(0, 3);
        updateCarousel();
    } catch (error) {
        console.log('error fetching posts', error);
    }
}

function updateCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = '';

    if (latestPosts.length === 0) {
        carouselInner.innerHTML = '<p>No posts available</p>';
        return;
    }

    const post = latestPosts[currentPage - 1];
    const postElement = document.createElement('div');
    postElement.classList.add('carousel-item');
    postElement.innerHTML = `
        <img src="${post.media.url}" alt="${post.title}">
        <div class="carousel-item-content">
            <h3>${post.title}</h3>
            <a href="#" class="read-more" postId="${post.id}" postName="${post.author.name}">Read More</a>
        </div>

    `;
    carouselInner.appendChild(postElement);

    const readMoreLink = postElement.querySelector('.read-more');
    readMoreLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const postId = post.id;
        const postName = post.author.name;
        window.location.href = `detailspost.html?id=${postId}&name=${postName}`;
    });
}



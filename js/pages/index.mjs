import { allPost } from "../modules/allpost.mjs";
import { createCarousel } from "../modules/carousel.mjs";
import { createFooter } from "./footer.mjs";
import { createNavbar } from "./navbar.mjs";
import { displayPagination } from "../modules/pagination.mjs";
import { filterIcon } from "../modules/filter.mjs";
import { pageLoading, removeLoader } from "../modules/loader.mjs";
import { createSearchInput } from "../modules/search.mjs";


//carousel elements
export function createPrevButton() {
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prevBtn';
    prevBtn.classList.add('carousel-btn', 'prev-btn');
    prevBtn.textContent = '❮';
    return prevBtn;
}
export function createNextButton() {
    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextBtn';
    nextBtn.classList.add('carousel-btn', 'next-btn');
    nextBtn.textContent = '❯';
    return nextBtn;
}
export function createCarouselInner() {
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');
    carouselInner.id = 'carouselInner';
    return carouselInner;
}


//grid thumbnail
const postsPerPage = 12; 
let totalPosts = 0; 


export async function displayPostGrid(pageNumber = 1, postsData, filter,searchTerm) {
    if (!postsData) {
        postsData = await allPost();
    }

    let posts = postsData.data;

    if (filter && filter !== 'All') {
        posts = posts.filter(post => post.tags.includes(filter));
    }
    if (searchTerm) {
        posts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }


    totalPosts = posts.length; 

    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = pageNumber * postsPerPage;
    const slicedPosts = posts.slice(startIndex, endIndex);

    const postGrid = document.getElementById('postGrid');
    postGrid.innerHTML = ''; 

    if (!postsData || !postsData.data || !Array.isArray(postsData.data) || totalPosts === 0) {
        postGrid.innerHTML = '<p>No posts available</p>';
        return;
    }

    slicedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('grid-item');
        postElement.innerHTML = `
            <img src="${post.media.url}" alt="${post.title}">
            <h3>${post.title}</h3>
        `;
        postElement.addEventListener('click', () => {
            window.location.href = `detailspost.html?id=${post.id}&name=${post.author.name}`;
        });
        postGrid.appendChild(postElement);
    });

    const totalPages = Math.ceil(totalPosts / postsPerPage);
    displayPagination(totalPages, pageNumber, (newPage) => {
        displayPostGrid(newPage, postsData, filter);
    });

}

export async function createPostGrid() {
    const main = document.querySelector('main');

    const postGrid = document.createElement('div');
    postGrid.id = 'postGrid';
    postGrid.classList.add('thumbnail');
    main.appendChild(postGrid);

    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    main.appendChild(paginationContainer);
}

async function makePage() {
    createNavbar('container');
    pageLoading();
    createCarousel();
    filterIcon();
    createSearchInput();
    createPostGrid();
    displayPostGrid(1); 
    createFooter();
    setTimeout (removeLoader,300);

}

makePage();











import { allPost } from "./allpost.mjs";
import { displayPostGrid } from "../pages/index.mjs";

let searchTerm = ''; 

export function createSearchInput() {
    const main = document.querySelector('main');
    const filterDiv = document.getElementById('filter');
   
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.placeholder = 'Search posts by title...';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fa-solid fa-magnifying-glass';

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    searchInput.addEventListener('input', (event) => {
        searchTerm = event.target.value; 
        updatePostGrid();
    });

    filterDiv.appendChild(searchContainer);
    main.appendChild(filterDiv);
  
}

export function getSearchTerm() {
    return searchTerm;
}

async function updatePostGrid(pageNumber = 1, filter) {
    const postsData = await allPost();
    const searchTerm = getSearchTerm();
    displayPostGrid(pageNumber, postsData, filter, searchTerm);
}


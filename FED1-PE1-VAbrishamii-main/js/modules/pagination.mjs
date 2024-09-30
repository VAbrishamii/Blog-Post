

export function displayPagination(totalPages, currentPage, onPageChange) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; 

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.href = '#'; 
        pageLink.classList.add('pagination-link');
        if (i === currentPage) {
            pageLink.classList.add('active'); 
        }
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            onPageChange(i);
        });
        paginationContainer.appendChild(pageLink);
    }
}



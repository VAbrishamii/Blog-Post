export function pageLoading() {
    const body = document.querySelector('body');

    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';

    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader');

    loadingDiv.appendChild(loaderDiv);
    body.appendChild(loadingDiv);
}

export function removeLoader() {
    const loader = document.getElementById('loading');
    if (loader) {
        loader.remove();
    }
}

export function showLoader() {
    const existingLoader = document.getElementById('loading');
    if (!existingLoader) {
        pageLoading();
    } else {
        existingLoader.classList.remove('loaded');
    }
}
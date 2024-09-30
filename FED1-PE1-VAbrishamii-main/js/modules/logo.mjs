function createLogo(src, alt, className) {
    const logo = document.createElement('img');
    logo.src = src;
    logo.alt = alt;
    if (className) {
        logo.classList.add(className);
    }

    logo.addEventListener('click', () => {
        window.location.href = '../index.html'; 
    });
    return logo;
}
export {createLogo}

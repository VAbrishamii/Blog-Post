import { createLogo } from "../modules/logo.mjs";

export async function createFooter(){
    const footer = document.getElementById('footer');

    footer.innerHTML = '';

    const logo = createLogo("../asset/images/logo.png", "Trip", "logo");
    footer.appendChild(logo);

    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact-info');
    
    const emailParagraph = document.createElement('p');
    emailParagraph.textContent = 'Contact Us: trip@trip.no';
    contactDiv.appendChild(emailParagraph);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');

    const iconList = document.createElement('ul');
    iconList.classList.add('icon-item');

    const instagramIcon = document.createElement('li');
    const instagramIconContent = document.createElement('i');
    instagramIconContent.classList.add('fa-brands', 'fa-instagram');
    instagramIcon.appendChild(instagramIconContent);

    const facebookIcon = document.createElement('li');
    const facebookIconContent = document.createElement('i');
    facebookIconContent.classList.add('fa-brands', 'fa-facebook');
    facebookIcon.appendChild(facebookIconContent);

    const xIcon = document.createElement('li');
    const xIconContent = document.createElement('i');
    xIconContent.classList.add('fa-solid', 'fa-x');
    xIcon.appendChild(xIconContent);

    instagramIcon.appendChild(instagramIconContent);
    facebookIcon.appendChild(facebookIconContent);
    xIcon.appendChild(xIconContent);

    iconList.appendChild(instagramIcon);
    iconList.appendChild(facebookIcon);
    iconList.appendChild(xIcon);
    iconDiv.appendChild(iconList);

    footer.appendChild(contactDiv);
    footer.appendChild(iconDiv);
    
}

createFooter();

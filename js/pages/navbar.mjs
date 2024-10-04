
import { createLogo } from "../modules/logo.mjs";

export function createNavbar(containerId){
  const container = document.getElementById(containerId);

  const mainContent = document.createElement("div");
  mainContent.classList.add("header");

  const logo = createLogo("../asset/images/logo.png", "Trip", "logo");
  mainContent.appendChild(logo);


  // Create the icons
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");

  const iconList = document.createElement("ul");
  iconList.classList.add("icon-item");


  const homeIcon = document.createElement("li");
  const homeIconContent = document.createElement("i");
  homeIconContent.classList.add("fa-solid", "fa-house");
  homeIcon.appendChild(homeIconContent);

  const userIcon = document.createElement("li");
  const userIconContent = document.createElement("i");
  userIconContent.classList.add("fa-solid", "fa-user");
  userIcon.appendChild(userIconContent);

  homeIcon.appendChild(homeIconContent);
  userIcon.appendChild(userIconContent);

  iconList.appendChild(homeIcon);
  iconList.appendChild(userIcon);

if (isAdmin()) {
  const editIcon = document.createElement('li');
  const editIconContent = document.createElement('i');
  editIconContent.classList.add("fa-solid", "fa-edit");
  editIcon.appendChild(editIconContent);

  const addIcon = document.createElement('li');
  const addIconContent = document.createElement('i');
  addIconContent.classList.add("fa-solid", "fa-plus", "add-icon");
  addIcon.appendChild(addIconContent);

  iconList.appendChild(editIcon);
  iconList.appendChild(addIcon);

  editIcon.addEventListener('click', function() {
    window.location.href = '../post/edit.html';
  });
  addIcon.addEventListener('click', function addPost(){
    window.location.href = "../post/index.html";
  })
}

iconDiv.appendChild(iconList);
mainContent.appendChild(iconDiv);
container.appendChild(mainContent);


function LoginPage() {
  window.location.href = "../account/login.html";
}

const userName = localStorage.getItem('userName');
if (userName) {
    const firstLetter = userName.charAt(0).toUpperCase();
    const userDisplayElement = document.createElement('div');
    userDisplayElement.id = 'userDisplay';
    userDisplayElement.textContent = firstLetter;
    iconDiv.appendChild(userDisplayElement);
    userIcon.classList.add('hide');
    userDisplayElement.addEventListener('click', function() {
     
      window.location.href = '../account/login.html';
    });
} else {
   
    userIcon.addEventListener("click", LoginPage);
}



homeIcon.addEventListener('click', function() {
  window.location.href = '../index.html';
});

function isAdmin() {
  return localStorage.getItem('isAdmin') === 'true';
}




}

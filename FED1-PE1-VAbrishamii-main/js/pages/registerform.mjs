import { createLogo } from "../modules/logo.mjs";

  export async function register(){

  const container = document.getElementById("container");
  const logo = createLogo("../asset/images/logo.png", "Trip", "logo");
  container.appendChild(logo);

  const signupContainer = document.createElement("div");
  signupContainer.id = "signup-container";
  signupContainer.className = "signup-container";

  const signupForm = document.createElement("form");
  signupForm.id = "signup-form";
  signupForm.className = "signup-form";
  const signupMessage = document.createElement("p");
  signupMessage.id = "signup-message";

  signupContainer.appendChild(signupForm);
  signupContainer.appendChild(signupMessage);
  container.appendChild(signupContainer);

  // Function to create form elements
  function createFormElement(type, id, label, placeholder) {
    const div = document.createElement("div");
    div.className = "form";

    const labelElement = document.createElement("label");
    labelElement.textContent = label;
    labelElement.className = "form-label";

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.required = true;
    input.className = "form-input";
    input.placeholder = placeholder;

    div.appendChild(labelElement);
    div.appendChild(input);
    signupForm.appendChild(div);
  }

  
  createFormElement("text", "name", "Name *", 'Enter your name');
  createFormElement("email", "email", "Email *", 'example:name@stud.noroff.no');
  createFormElement("password", "password", "Password *", 'Your password should be 8 character');

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "signup-btn");
  submitButton.type = "submit";
  submitButton.textContent = "Register";
  signupForm.appendChild(submitButton);
}

import { register } from "../pages/registerform.mjs";
import { Base_URL, Auth_endpoint } from "./api.mjs";

register();

document.addEventListener("DOMContentLoaded", async function(){
    const signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', async function(event){
    event.preventDefault();

    let formData = new FormData(signupForm);
    let registerData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    const nameRegex = /^[a-zA-Z0-9_]+$/; 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/; 
    const passwordMinLength = 8; 

    const name = registerData.name;
    const email = registerData.email;
    const password = registerData.password;

    
    // Validation checks
    if (!nameRegex.test(name)) {
        alert('Name must not contain punctuation symbols apart from underscore (_).');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid stud.noroff.no email address.');
        return;
    }

    if (password.length < passwordMinLength) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    const url = `${Base_URL}${Auth_endpoint.REGISTER}`;
    const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData)    
        };
        try {
            const response = await fetch(url,options);

        if (!response.ok) {
            if (response.status === 400) {
                alert('A user with the provided email already exists. Please use a different email address.');
            } else {
                throw new Error('Failed to register');
         
            }

        }
        
        const responseData = await response.json();
        alert('Register successfully');
        window.location.href = './login.html'
    } catch (error) {
        if (error.message.includes('email')) {
            alert('A user with the provided email already exists. Please use a different email address.');
        } else {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
    }
}
})
})
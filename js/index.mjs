// >>> Register a new user <<<
import { registerUser } from "./modules/login.mjs";
const signUp = document.getElementById("sign-up");
signUp.addEventListener("submit", (event) => {
	event.preventDefault();
	registerUser();
});
// >>><<<

// >>> Login to the site <<<
import { loginUser } from "./modules/login.mjs";
const login = document.getElementById("login");
login.addEventListener("submit", (event) => {
	event.preventDefault();
	loginUser();
});
// >>><<<

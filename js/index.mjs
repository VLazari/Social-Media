import isLogin from "/js/modules/login-check.mjs";
import { registerUser } from "/js/modules/login.mjs";
import { loginUser } from "/js/modules/login.mjs";

function checkStatus() {
	if (isLogin()) {
		location.replace("/pages/home.html");
	}
}
checkStatus();

function regNewUser() {
	const signUp = document.getElementById("sign-up");
	signUp.addEventListener("submit", (event) => {
		event.preventDefault();
		registerUser();
	});
}
regNewUser();

function logUser() {
	const login = document.getElementById("login");
	login.addEventListener("submit", (event) => {
		event.preventDefault();
		loginUser();
	});
}
logUser();

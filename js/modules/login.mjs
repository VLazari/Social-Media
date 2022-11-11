/**
 * Register a new user account on the Moments website.
 * All necessary parameters are defined inside the function.
 */
export function registerUser() {
	const registerName = document.getElementById("name");
	const registerEmail = document.getElementById("register-email");
	const registerPassword = document.getElementById("register-password");
	const registerAvatar = document.getElementById("avatar");
	const registerBanner = document.getElementById("banner");
	if (registerBanner.value === "") {
		registerBanner.value = "https://i.picsum.photos/id/1056/3988/2720.jpg?hmac=qX6hO_75zxeYI7C-1TOspJ0_bRDbYInBwYeoy_z_h08";
	}
	if (registerAvatar.value === "") {
		registerAvatar.value = "https://xsgames.co/randomusers/assets/avatars/pixel/14.jpg";
	}
	const registerOptions = {
		method: "POST",
		body: JSON.stringify({
			name: registerName.value.trim(),
			email: registerEmail.value.trim(),
			banner: registerBanner.value.trim(),
			avatar: registerAvatar.value.trim(),
			password: registerPassword.value.trim(),
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	fetch("https://nf-api.onrender.com/api/v1/social/auth/register", registerOptions)
		.then((response) => response.json())
		.then((json) => {
			// Check for sign up reject by the server
			if (json.id === undefined) {
				const displayErr = document.getElementById("err-display");
				document.getElementById("register-err").innerHTML = json.error;
				displayErr.classList.remove("d-none");
				displayErr.classList.add("d-flex");
			} else {
				const successMessage = document.getElementById("account-created");
				const signUp = document.getElementById("sign-up");
				successMessage.classList.remove("d-none");
				successMessage.classList.add("d-flex");
				signUp.classList.add("d-none");
			}
		});
}

/**
 * Login the user.
 * All necessary parameters are defined inside the function.
 */
export async function loginUser() {
	const loginEmail = document.getElementById("email");
	const loginPass = document.getElementById("password");
	const loginOptions = {
		method: "POST",
		body: JSON.stringify({
			email: loginEmail.value.trim(),
			password: loginPass.value.trim(),
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	const response = await fetch("https://nf-api.onrender.com/api/v1/social/auth/login", loginOptions);
	if (response.status === 200) {
		const json = await response.json();
		localStorage.setItem("name", json.name);
		localStorage.setItem("avatar", json.avatar);
		localStorage.setItem("email", json.email);
		localStorage.setItem("token", json.accessToken);
		location.replace("/pages/home.html");
	} else {
		const loginError = document.getElementById("login-error");
		loginError.classList.remove("d-none");
		loginError.classList.add("d-flex");
	}
}

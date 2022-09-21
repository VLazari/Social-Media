import { currentUser } from "/js/modules/user-data.mjs";

const profile = document.getElementById("profile");
const logout = document.getElementById("logout");

profile.href = `/pages/profile.html?name=${currentUser.name}`;

logout.addEventListener("click", () => {
	localStorage.clear();
});

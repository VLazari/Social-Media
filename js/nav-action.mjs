import { currentUser } from "/js/modules/user-data.mjs";
import { postData, addPostBody } from "/js/modules/API-access.mjs";
import { getData } from "/js/modules/API-access.mjs";
import { displaySearchResults } from "/js/modules/element-constructor.mjs";

const mainAvatar = document.querySelector(".main-avatar");
mainAvatar.style.backgroundImage = `url("${currentUser.avatar}")`;

// >>> Navigate to user profile page <<<

const profile = document.getElementById("profile");
profile.href = `/pages/profile.html?name=${currentUser.name}`;

// >>> Logout current user <<<

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
	localStorage.clear();
	location.replace("/index.html");
});

// >>> Add a new posts <<<

const baseURL = "https://nf-api.onrender.com/api/v1/social";
const addPostUrl = baseURL + "/posts";
const addTitle = document.getElementById("add-post-title");
const addBody = document.getElementById("add-post-body");
const addTags = document.getElementById("add-post-tags");
const addImage = document.getElementById("add-post-image");
const addPostForm = document.getElementById("add-post-form");
const addPost = document.getElementById("add-post");
const postBtn = document.getElementById("post-btn");
addPost.addEventListener("click", () => {
	addTitle.value = "";
	addBody.value = "";
	addTags.value = "";
	addImage.value = "";
	postBtn.innerText = "Add Post";

	addPostForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const tags = [addTags.value.trim()];
		const options = addPostBody("POST", addTitle.value.trim(), addBody.value.trim(), tags, addImage.value.trim());
		postData(addPostUrl, options);
	});
});

// >>> Search for a user <<<

const displaySearch = document.getElementById("search-results");
const searchUser = document.getElementById("search");
const searchUserModal = document.getElementById("search-user");
const userData = await getData("https://nf-api.onrender.com/api/v1/social/profiles");

searchUserModal.onclick = () => {
	displaySearch.innerHTML = "";
	userData.forEach((user) => {
		user.avatar = user.avatar.trim() == "" ? "https://xsgames.co/randomusers/avatar.php?g=female" : user.avatar;
		displaySearchResults(displaySearch, user.avatar, user.name);
	});
};

function convertStr(string) {
	return string.trim().toLowerCase();
}

searchUser.addEventListener("input", () => {
	displaySearch.innerHTML = "";
	const searchResult = userData.filter(({ name }) => convertStr(name).includes(convertStr(searchUser.value)));
	if (searchResult.length > 0 || convertStr(searchUser.value) == null) {
		searchResult.forEach(({ name, avatar }) => displaySearchResults(displaySearch, avatar, name));
	} else {
		displaySearch.innerText = `No results found for "${searchUser.value}"`;
	}
});

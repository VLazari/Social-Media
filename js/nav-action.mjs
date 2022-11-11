import { currentUser } from "/js/modules/user-data.mjs";
import { postData, addPostBody } from "/js/modules/API-access.mjs";
import { getData } from "/js/modules/API-access.mjs";
import { displaySearchResults } from "/js/modules/element-constructor.mjs";

const baseURL = "https://nf-api.onrender.com/api/v1/social";
const addPostUrl = baseURL + "/posts";
const addTitle = document.getElementById("add-post-title");
const addBody = document.getElementById("add-post-body");
const addTags = document.getElementById("add-post-tags");
const addImage = document.getElementById("add-post-image");
const addPostForm = document.getElementById("add-post-form");
const addPost = document.getElementById("add-post");
const postBtn = document.getElementById("post-btn");
const displaySearch = document.getElementById("search-results");
const searchUser = document.getElementById("search");
const searchUserModal = document.getElementById("search-user");
const userData = await getData("https://nf-api.onrender.com/api/v1/social/profiles");
const mainAvatar = document.querySelector(".main-avatar");
mainAvatar.style.backgroundImage = `url("${currentUser.avatar}")`;

const profile = document.getElementById("profile");
profile.href = `/pages/profile.html?name=${currentUser.name}`;

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
	localStorage.clear();
	location.replace("/index.html");
});

/**
 * Convert the string to lower case and removes the before and after spaces.
 * @param {string} string
 * @returns Converted string
 */
function convertStr(string) {
	return string.trim().toLowerCase();
}

/**
 * Add a new post.
 */
function addNewPost() {
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
}

/**
 * Initiate the search modal.
 */
function searchModal() {
	searchUserModal.onclick = () => {
		displaySearch.innerHTML = "";
		userData.forEach((user) => {
			user.avatar = user.avatar.trim() == "" ? "https://xsgames.co/randomusers/avatar.php?g=female" : user.avatar;
			displaySearchResults(displaySearch, user.avatar, user.name);
		});
	};
}

/**
 * Search a user by the input value.
 */
function filterUsers() {
	searchUser.addEventListener("input", () => {
		displaySearch.innerHTML = "";
		const searchResult = userData.filter(({ name }) => convertStr(name).includes(convertStr(searchUser.value)));
		if (searchResult.length > 0 || convertStr(searchUser.value) == null) {
			searchResult.forEach(({ name, avatar }) => displaySearchResults(displaySearch, avatar, name));
		} else {
			displaySearch.innerText = `No results found for "${searchUser.value}"`;
		}
	});
}

addNewPost();
searchModal();
filterUsers();

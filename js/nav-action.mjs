import { currentUser } from "/js/modules/user-data.mjs";
const { name, avatar } = currentUser;

// >>> Display user main avatar <<<

const mainAvatar = document.querySelector(".main-avatar");

mainAvatar.style.backgroundImage = `url("${avatar}")`;

// >>> Navigate to user profile page <<<

const profile = document.getElementById("profile");
profile.href = `/pages/profile.html?name=${name}`;
// >>><<<

// >>> Logout current user <<<

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
	localStorage.clear();
	location.replace("/index.html");
});
// >>><<<

// >>> Add a new posts <<<

import { postData, addPostBody } from "/js/modules/API-access.mjs";

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
// >>><<<

// >>> Search for a user <<<

import { getData } from "/js/modules/API-access.mjs";
import { displaySearchResults } from "/js/modules/element-constructor.mjs";
const displayResults = document.getElementById("search-results");
const searchUser = document.getElementById("search");

const data = await getData("https://nf-api.onrender.com/api/v1/social/profiles");

const users = data.reverse().map(({ avatar, name }) => {
	avatar = avatar.trim() == "" ? "https://xsgames.co/randomusers/avatar.php?g=female" : avatar;
	displaySearchResults(displayResults, avatar, name);
	return { name, avatar };
});

function convertStr(string) {
	return string.trim().toLowerCase();
}

searchUser.addEventListener("input", () => {
	displayResults.innerHTML = "";
	const searchResult = users.filter(({ name }) => convertStr(name).includes(convertStr(searchUser.value)));
	if (searchResult.length > 0 || convertStr(searchUser.value) == null) {
		searchResult.forEach(({ name, avatar }) => displaySearchResults(displayResults, avatar, name));
	} else {
		displayResults.innerText = `No results found for "${searchUser.value}"`;
	}
});

// >>><<<

// const searchModal = document.getElementById(searchUserModal);
// searchModal.innerHTML = `<div class="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
// 												<div class="modal-content">
// 													<div class="modal-header">
// 														<input id="search" type="text" class="form-control me-3" placeholder="Search..." />
// 														<button type="button" class="btn-close mx-1" data-bs-dismiss="modal" aria-label="Close"></button>
// 													</div>
// 													<div class="modal-body">
// 														<div id="search-results" class="ms-2"></div>
// 													</div>
// 													<div class="modal-footer d-flex flex-nowrap justify-content-evenly mobile-nav">
// 														<h1>Moments</h1>
// 													</div>
// 												</div>
// 											</div>`;

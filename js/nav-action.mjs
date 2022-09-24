import { currentUser } from "/js/modules/user-data.mjs";

// >>> Display user main avatar <<<

const mainAvatar = document.querySelector(".main-avatar");

mainAvatar.style.backgroundImage = `url("${currentUser.avatar}")`;

// >>> Navigate to user profile page <<<

const profile = document.getElementById("profile");
profile.href = `/pages/profile.html?name=${currentUser.name}`;

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
const addPostBtn = document.getElementById("add-post-btn");
const addPost = document.getElementById("add-post");
const editPostBtn = document.getElementById("edit-post-btn");
addPost.onclick = () => {
	addTitle.value = "";
	addBody.value = "";
	addTags.value = "";
	addImage.value = "";
	addPostBtn.className = "btn btn-primary d-inline-block";
	editPostBtn.className = "btn btn-primary d-none";
};
addPostBtn.addEventListener("click", () => {
	const tags = [addTags.value.trim()];
	const options = addPostBody("POST", addTitle.value.trim(), addBody.value.trim(), tags, addImage.value.trim());
	postData(addPostUrl, options);
});

// >>><<<

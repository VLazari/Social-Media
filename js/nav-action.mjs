import { currentUser } from "/js/modules/user-data.mjs";

const profile = document.getElementById("profile");
const logout = document.getElementById("logout");

profile.href = `/pages/profile.html?name=${currentUser.name}`;

logout.addEventListener("click", () => {
	localStorage.clear();
});

// >>> Add a new posts <<<

import { postData, addPostBody } from "./modules/API-access.mjs";

const baseURL = "https://nf-api.onrender.com/api/v1/social";

const addPostUrl = baseURL + "/posts";
const addTitle = document.getElementById("add-post-title");
const addBody = document.getElementById("add-post-body");
const addTags = document.getElementById("add-post-tags");
const addImage = document.getElementById("add-post-image");
const addPostBtn = document.getElementById("add-post-btn");

addPostBtn.addEventListener("click", () => {
	const tags = [addTags.value.trim()];
	const options = addPostBody(addTitle.value.trim(), addBody.value.trim(), tags, addImage.value.trim());
	postData(addPostUrl, options);
});

// >>><<<

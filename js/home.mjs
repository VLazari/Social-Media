const baseURL = "https://nf-api.onrender.com/api/v1/social";

// >>> Prevent access to page via URL for users that are not logged in <<<

import isLogin from "./modules/login-check.mjs";
if (isLogin() === false) {
	location.replace("../index.html");
}

// >>><<<

// >>> Display the user avatar and name <<<

import { currentUser } from "./modules/user-data.mjs";

const avatar = document.querySelectorAll(".avatar-img");
const name = document.querySelectorAll(".user-name");

avatar.forEach((element) => (element.style.backgroundImage = `url("${currentUser.avatar}")`));
name.forEach((element) => (element.innerHTML = `${currentUser.name}`));

// >>><<<

// >>> Display the posts  <<<

import { getData } from "./modules/API-access.mjs";

const url = baseURL + "/posts?_author=true&_comments=true&reactions=true&sort=created&sortOrder=desc&limit=10";
const mainPosts = document.querySelector(".posts");
const posts = await getData(url);

//console.log(posts);
posts.forEach((post) => {
	let media = "";
	if (post.media.trim() != "") {
		media = `<img src="${post.media}" alt="Post image" />`;
	}
	mainPosts.innerHTML += `<div id="${post.id}" class="card mx-0 my-3 bg-light border border-primary rounded border-opacity-25">
                            <div class="p-3 d-flex align-items-center">
                              <div class="mx-3 avatar-img" style="background-image: url('${post.author.avatar}');"></div>
                              <h6 class="m-0 user-name">${post.author.name}</h6>
                            </div>
                            ${media}
                            <div class="card-body">
                              <i class="fa-regular fa-heart fa-xl mx-2 text-danger"></i>
                              <i class="fa-regular fa-comment fa-xl mx-2 text-primary"></i>
                            </div>
                            <div class="card-body py-0">
                              <p class="card-text fw-semibold my-0 py-0">${post.title}</p>
                            </div>
                            <div class="card-body py-0">
                              <p class="card-text">${post.body}</p>
                            </div>
                            <p class="card-text m-2 mx-3">
                              <small class="text-muted"> ${post.updated.substr(11, 5)} </small>
                              <small class="text-muted mx-2"> ${post.updated.substr(0, 10)} </small>
                            </p>
                          </div>`;
});

// >>><<<

// >>> Display the posts <<<

import { postData, addPostBody } from "./modules/API-access.mjs";

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

// import { deletePost } from "./modules/API-access.mjs";
// const del = baseURL + "/posts/140";
// const test = document.querySelectorAll(".fa-heart");
// test.forEach((action) => {
// 	action.addEventListener("click", (e) => {
// 		deletePost(del);
// 	});
// });

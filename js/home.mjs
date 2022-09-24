const baseURL = "https://nf-api.onrender.com/api/v1/social";

// >>> Prevent access to page via URL for users that are not logged in <<<

import isLogin from "./modules/login-check.mjs";
if (isLogin() === false) {
	location.replace("../index.html");
}

// >>><<<

// >>> Display the posts  <<<

import { getData } from "./modules/API-access.mjs";

const url = baseURL + "/posts?_author=true&_comments=true&reactions=true&sort=created&sortOrder=desc&limit=4&offset=0";
const mainPosts = document.querySelector(".posts");
const posts = await getData(url);

console.log(posts);
posts.forEach((post) => {
	let media = "";
	if (post.media.trim() != "") {
		media = `<img src="${post.media}" alt="Post image" />`;
	}
	mainPosts.innerHTML += `<div id="${post.id}" class="card mx-0 my-3 bg-light border border-primary rounded border-opacity-25">
                            <a href="/pages/profile.html?name=${post.author.name}" class="p-3 d-flex align-items-center">
                              <div class="mx-3 avatar-img" style="background-image: url('${post.author.avatar}');"></div>
                              <h6 class="m-0 user-name">${post.author.name}</h6>
                            </a>
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

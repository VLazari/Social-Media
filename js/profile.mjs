import { currentUser } from "/js/modules/user-data.mjs";
const queryUrl = location.search;
const urlParams = new URLSearchParams(queryUrl);
const userName = urlParams.get("name");
const baseURL = "https://nf-api.onrender.com/api/v1/social";

import { getData } from "/js/modules/API-access.mjs";

const data = await getData(baseURL + `/profiles/${userName}?_posts=true&_following=true&_followers=true`);
console.log(data);

// >>> Check if the profile page is for the current user or selected user <<<
let displayClass = "d-none";
const followUser = document.getElementById("follow-user");
const editProf = document.getElementById("edit-profile");
if (userName == currentUser.name) {
	displayClass = "d-inline-block";
	editProf.classList.remove("d-none");
} else {
	followUser.classList.remove("d-none");
}

// >>><<<

// >>> Display the user avatar and name <<<

const avatar = document.querySelector(".avatar-img");
const name = document.querySelectorAll(".user-name");
const banner = document.getElementById("banner");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

avatar.style.backgroundImage = `url("${data.avatar}")`;
name.forEach((element) => (element.innerHTML = data.name));
banner.style.backgroundImage = `url("${data.banner}")`;
followers.innerHTML += data._count.followers;
following.innerHTML += data._count.following;

// >>><<<

// >>> Display the user's posts <<<

const mainPosts = document.querySelector(".posts");

data.posts.forEach((post) => {
	let media = "";
	if (post.media.trim() != "") {
		media = `<img src="${post.media}" alt="Post image" />`;
	}
	mainPosts.innerHTML += `<div id="${post.id}" class="card mx-0 my-3 bg-light border border-primary rounded border-opacity-25">
                            <div class="p-3 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                              <div class="mx-3 avatar-img" style="background-image: url('${data.avatar}');"></div>
                              <h6 class="m-0 user-name">${data.name}</h6>
                            </div>
                              <div>
                                <button type="button" class="border-0 text-bg-light px-3 py-4 edit-btn" data-bs-toggle="modal" data-bs-target="#addPostModal" 
                                data-post-id="${post.id}" data-title="${post.title}" data-body="${post.body}" data-tag="${post.tag}" data-media="${
		post.media
	}">
                                  <i class="fa-solid fa-file-pen fa-lg mx-2 text-primary ${displayClass}"></i>
                                </button>
                                <i class="fa-solid fa-trash fa-lg mx-2 text-danger ${displayClass}" data-post-id="${post.id}"></i>
                              </div>
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

// >>> Delete posts <<<

import { deletePost } from "/js/modules/API-access.mjs";
const delPost = document.querySelectorAll(".fa-trash");
delPost.forEach((button) => {
	button.addEventListener("click", (e) => {
		deletePost(baseURL + `/posts/${button.dataset.postId}`);
	});
});

// >>><<<

// >>> Edit post <<<
import { postData, addPostBody } from "/js/modules/API-access.mjs";

const editBtn = document.querySelectorAll(".edit-btn");
const editTitle = document.getElementById("add-post-title");
const editBody = document.getElementById("add-post-body");
const editTags = [document.getElementById("add-post-tags")];
const editImage = document.getElementById("add-post-image");
const editPostBtn = document.getElementById("edit-post-btn");
const addPostBtn = document.getElementById("add-post-btn");
let userId = "";

editBtn.forEach((button) => {
	button.addEventListener("click", () => {
		userId = button.dataset.postId;
		editTitle.value = button.dataset.title;
		editBody.value = button.dataset.body;
		editTags.value = button.dataset.tag;
		editImage.value = button.dataset.media;
		addPostBtn.className = "btn btn-primary d-none";
		editPostBtn.className = "btn btn-primary d-inline-block";
	});

	editPostBtn.addEventListener("click", () => {
		const addPostUrl = baseURL + `/posts/${userId}`;
		const tags = [editTags.value];
		const options = addPostBody("PUT", editTitle.value.trim(), editBody.value.trim(), tags, editImage.value.trim());
		postData(addPostUrl, options);
	});
});

// >>><<<

// >>> Edit profile <<<
const editUserProf = document.getElementById("change-prof-btn");
const editBanner = document.getElementById("edit-banner");
const editAvatar = document.getElementById("edit-avatar");

let newBanner = document.getElementById("new-banner");
let newAvatar = document.getElementById("new-avatar");
const url = baseURL + `/profiles/${currentUser.name}/media`;
editBanner.value = data.banner;
editAvatar.value = currentUser.avatar;

newBanner.style.backgroundImage = `url("${editBanner.value}")`;
newAvatar.style.backgroundImage = `url("${editAvatar.value}")`;

editBanner.onchange = profPreview;
function profPreview() {
	newBanner.style.backgroundImage = `url("${editBanner.value}")`;
	newAvatar.style.backgroundImage = `url("${editAvatar.value}")`;
}
editUserProf.addEventListener("click", async () => {
	const options = {
		method: "PUT",
		body: JSON.stringify({
			banner: editBanner.value.trim(),
			avatar: editAvatar.value.trim(),
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: currentUser.token,
		},
	};
	const response = await fetch(url, options);
	if (response.status == 200) {
		localStorage.setItem("avatar", editAvatar.value.trim());
		location.reload();
	}
});

// >>><<<

// >>> Follow / Unfollow user <<<
import { putRequest } from "/js/modules/API-access.mjs";

function checkStatus() {
	followUser.innerHTML = "Follow";
	let action = "follow";
	data.followers.forEach((user) => {
		if (user.name === currentUser.name) {
			followUser.innerHTML = "Unfollow";
			action = "unfollow";
		}
	});
	return action;
}
let action = checkStatus();

followUser.addEventListener("click", () => {
	putRequest(baseURL + `/profiles/${userName}/${action}`);
	if (action === "follow") {
		action = "unfollow";
		followUser.innerHTML = "Unfollow";
	} else {
		action = "follow";
		followUser.innerHTML = "Follow";
	}
});
// >>><<<

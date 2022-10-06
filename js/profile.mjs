import { currentUser } from "/js/modules/user-data.mjs";
import * as create from "/js/modules/element-constructor.mjs";
import { getData } from "/js/modules/API-access.mjs";

const queryUrl = location.search;
const urlParams = new URLSearchParams(queryUrl);
const userName = urlParams.get("name");
const baseURL = "https://nf-api.onrender.com/api/v1/social";
const data = await getData(baseURL + `/profiles/${userName}?_posts=true&_following=true&_followers=true`);

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
let avatarImgUrl = "https://xsgames.co/randomusers/avatar.php?g=female";
if (data.avatar.trim() != "") {
	avatarImgUrl = data.avatar;
}
avatar.style.backgroundImage = `url("${avatarImgUrl}")`;
name.forEach((element) => (element.innerHTML = data.name));
let i = Math.floor(Math.random() * 100);
let imgBanner = `https://picsum.photos/800/600?random=${i}`;
if (data.banner.trim() != "") {
	imgBanner = data.banner;
}
banner.style.backgroundImage = `url("${imgBanner}")`;
followers.innerHTML += data._count.followers;
following.innerHTML += data._count.following;
// >>><<<

// >>> Display the user's posts <<<

create.profilePosts(data, displayClass);
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

const editBtn = document.querySelectorAll(".fa-file-pen");
const editTitle = document.getElementById("add-post-title");
const editBody = document.getElementById("add-post-body");
const editTags = [document.getElementById("add-post-tags")];
const editImage = document.getElementById("add-post-image");
const editPostForm = document.getElementById("add-post-form");
const postBtn = document.getElementById("post-btn");
let userId = "";

editBtn.forEach((button) => {
	button.addEventListener("click", () => {
		userId = button.dataset.postId;
		editTitle.value = button.dataset.title;
		editBody.value = button.dataset.body;
		editTags.value = button.dataset.tag;
		editImage.value = button.dataset.media;
		postBtn.innerText = "Edit Post";

		editPostForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const addPostUrl = baseURL + `/posts/${userId}`;
			const tags = [editTags.value];
			const options = addPostBody("PUT", editTitle.value.trim(), editBody.value.trim(), tags, editImage.value.trim());
			postData(addPostUrl, options);
		});
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

// >>> Comment  <<<

import { sendComment } from "/js/modules/API-access.mjs";
const comments = document.querySelectorAll(".fa-comment");
const postComment = document.getElementById("comment-btn");
comments.forEach((comm) => {
	comm.addEventListener("click", () => {
		postComment.dataset.id = comm.dataset.postId;
		create.displayComments(comm.dataset.postId);
	});
});

postComment.addEventListener("click", async () => {
	await sendComment(postComment.dataset.id);
	create.displayComments(postComment.dataset.id);
});
// >>><<<

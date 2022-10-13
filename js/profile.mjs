import { currentUser } from "/js/modules/user-data.mjs";
import * as create from "/js/modules/element-constructor.mjs";
import * as api from "/js/modules/API-access.mjs";
import * as comment from "/js/modules/post-comment.mjs";

const queryUrl = location.search;
const urlParams = new URLSearchParams(queryUrl);
const userName = urlParams.get("name");
const baseURL = "https://nf-api.onrender.com/api/v1/social";
const data = await api.getData(baseURL + `/profiles/${userName}?_posts=true&_following=true&_followers=true`);
let displayClass = "d-none";
const followUser = document.getElementById("follow-user");
const editProf = document.getElementById("edit-profile");
const avatar = document.querySelector(".avatar-img");
const name = document.querySelectorAll(".user-name");
const banner = document.getElementById("banner");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
let avatarImgUrl = "https://xsgames.co/randomusers/avatar.php?g=female";
const editTitle = document.getElementById("add-post-title");
const editBody = document.getElementById("add-post-body");
const editTags = [document.getElementById("add-post-tags")];
const editImage = document.getElementById("add-post-image");
const editPostForm = document.getElementById("add-post-form");
const postBtn = document.getElementById("post-btn");
const postComment = document.getElementById("comment-btn");
const editUserProf = document.getElementById("change-prof-btn");
const editBanner = document.getElementById("edit-banner");
const editAvatar = document.getElementById("edit-avatar");
let newBanner = document.getElementById("new-banner");
let newAvatar = document.getElementById("new-avatar");
const url = baseURL + `/profiles/${currentUser.name}/media`;
let userId = "";

function checkForCurrentUserProfile() {
	if (userName == currentUser.name) {
		displayClass = "d-inline-block";
		editProf.classList.remove("d-none");
	} else {
		followUser.classList.remove("d-none");
	}
}

function displayUserProfile() {
	if (data.avatar.trim() != "") {
		avatarImgUrl = data.avatar;
	}
	avatar.style.backgroundImage = `url("${avatarImgUrl}")`;
	name.forEach((element) => (element.innerHTML = data.name));
	let imgBanner = `https://i.picsum.photos/id/1056/3988/2720.jpg?hmac=qX6hO_75zxeYI7C-1TOspJ0_bRDbYInBwYeoy_z_h08`;
	if (data.banner.trim() != "") {
		imgBanner = data.banner;
	}
	banner.style.backgroundImage = `url("${imgBanner}")`;
	followers.innerHTML += data._count.followers;
	following.innerHTML += data._count.following;
}

function deletePost() {
	const delPost = document.querySelectorAll(".fa-trash");
	delPost.forEach((button) => {
		button.addEventListener("click", (e) => {
			console.log("button");
			api.deletePost(baseURL + `/posts/${button.dataset.postId}`);
		});
	});
}

function editPost() {
	const editBtn = document.querySelectorAll(".fa-file-pen");
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
				const options = api.addPostBody("PUT", editTitle.value.trim(), editBody.value.trim(), tags, editImage.value.trim());
				api.postData(addPostUrl, options);
			});
		});
	});
}

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

function processFollowUser() {
	followUser.addEventListener("click", () => {
		api.putRequest(baseURL + `/profiles/${userName}/${action}`);
		if (action === "follow") {
			action = "unfollow";
			followUser.innerHTML = "Unfollow";
		} else {
			action = "follow";
			followUser.innerHTML = "Follow";
		}
	});
}

function profPreview() {
	newBanner.style.backgroundImage = `url("${editBanner.value}")`;
	newAvatar.style.backgroundImage = `url("${editAvatar.value}")`;
}

function processProfileEdit() {
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
}

function editOwnerProfile() {
	editBanner.value = data.banner;
	editAvatar.value = currentUser.avatar;
	newBanner.style.backgroundImage = `url("${editBanner.value}")`;
	newAvatar.style.backgroundImage = `url("${editAvatar.value}")`;
	editBanner.onchange = profPreview;
	processProfileEdit();
}

checkForCurrentUserProfile();
displayUserProfile();
create.profilePosts(data, displayClass);
api.reactToPost(baseURL);
deletePost();
editPost();
let action = checkStatus();
processFollowUser();
editOwnerProfile();
comment.display(postComment);
comment.process(postComment);

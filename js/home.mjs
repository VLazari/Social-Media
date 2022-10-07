const baseURL = "https://nf-api.onrender.com/api/v1/social";
import * as create from "/js/modules/element-constructor.mjs";
import { currentUser } from "/js/modules/user-data.mjs";
const { token } = currentUser;

// >>> Prevent access to page via URL for users that are not logged in <<<

import isLogin from "/js/modules/login-check.mjs";
if (isLogin() === false) {
	location.replace("/index.html");
}
// >>><<<

// >>> Display posts  <<<

import { getData } from "/js/modules/API-access.mjs";

const url = baseURL + "/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc&limit=10&offset=0";
let posts = await getData(url);
create.displayPost(posts);

window.addEventListener("scroll", async () => {
	let pageDisplayOffset = 0;
	if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
		pageDisplayOffset += 10;
		const url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
		const nextPage = await getData(url);
		nextPage.map((element) => posts.push(element));
		create.displayPost(nextPage);
	}
});
// >>><<<

// >>> React to post  <<<

import { putRequest } from "/js/modules/API-access.mjs";

const reactions = document.querySelectorAll(".fa-heart");

reactions.forEach((react) => {
	react.addEventListener("click", () => {
		const putURL = baseURL + `/posts/${react.dataset.postId}/react/❤️`;
		react.classList.remove("fa-regular");
		react.classList.add("fa-solid");
		putRequest(putURL);
	});
});
// >>><<<

// >>> Comment on post <<<

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

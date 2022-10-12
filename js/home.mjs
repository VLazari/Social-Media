import * as create from "/js/modules/element-constructor.mjs";
import isLogin from "/js/modules/login-check.mjs";
import * as api from "/js/modules/API-access.mjs";
const baseURL = "https://nf-api.onrender.com/api/v1/social";
const postComment = document.getElementById("comment-btn");
let pageDisplayOffset = 0;
const url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
let posts = await api.getData(url);

function checkStatus() {
	if (isLogin() === false) {
		location.replace("/index.html");
	}
}

checkStatus();

function createComment() {
	const comments = document.querySelectorAll(".fa-comment");
	comments.forEach((comm) => {
		comm.addEventListener("click", () => {
			postComment.dataset.id = comm.dataset.postId;
			create.displayComments(comm.dataset.postId);
		});
	});
}

create.displayPost(posts);
createComment();
api.reactToPost(baseURL);

window.addEventListener("scroll", async () => {
	if (window.innerHeight + window.pageYOffset > document.body.offsetHeight) {
		pageDisplayOffset += 10;
		const url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
		const nextPage = await api.getData(url);
		create.displayPost(nextPage);
		createComment();
		api.reactToPost(baseURL);
	}
});

postComment.addEventListener("click", async () => {
	await api.sendComment(postComment.dataset.id);
	create.displayComments(postComment.dataset.id);
});

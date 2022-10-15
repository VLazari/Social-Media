import * as create from "/js/modules/element-constructor.mjs";
import isLogin from "/js/modules/login-check.mjs";
import * as api from "/js/modules/API-access.mjs";
import * as comment from "/js/modules/post-comment.mjs";

const baseURL = "https://nf-api.onrender.com/api/v1/social";
const postComment = document.getElementById("comment-btn");
const sortBtn = document.querySelectorAll(".sort-btn");
const postsContent = document.querySelector(".posts");
let pageDisplayOffset = 0;
let sortBy = "created";
let url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=${sortBy}&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
let posts = await api.getData(url);

/**
 * Check if the user is logged in. Prevent unauthorized access through the link.
 */
function checkStatus() {
	if (isLogin() === false) {
		location.replace("/index.html");
	}
}
checkStatus();

/**
 * Display the post content in a modal window.
 */
function viewPostById() {
	const titles = document.querySelectorAll(".post-title");
	titles.forEach((title) => {
		title.addEventListener("click", async () => {
			const url = `${baseURL}/posts/${title.dataset.postId}?_author=true`;
			const post = await api.getData(url);
			create.displayPostById(post);
		});
	});
}

/**
 * Fetch the API and add ten more posts when scrolling to the bottom of the page.
 */
function displayOnScroll() {
	window.addEventListener("scroll", async () => {
		if (window.innerHeight + window.pageYOffset > document.body.offsetHeight) {
			pageDisplayOffset += 10;
			url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=${sortBy}&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
			const nextPage = await api.getData(url);
			create.displayPost(nextPage);
			comment.display(postComment);
			api.reactToPost(baseURL);
			viewPostById();
		}
	});
}

/**
 * Sort the posts by date or title.
 * @returns sort type.
 */
function sortPostBy() {
	let sort = "created";
	sortBtn.forEach((btn) => {
		sort = btn.checked ? btn.value : sort;
	});
	return sort;
}

/**
 * Display the posts sorted by selected type.
 */
function displayBySort() {
	sortBtn.forEach((btn) => {
		btn.addEventListener("click", async () => {
			sortBy = sortPostBy();
			pageDisplayOffset = 0;
			url = baseURL + `/posts?_author=true&_comments=true&_reactions=true&sort=${sortBy}&sortOrder=desc&limit=10&offset=${pageDisplayOffset}`;
			posts = await api.getData(url);
			window.scrollTo(0, 0);
			postsContent.innerHTML = "";
			create.displayPost(posts);
			comment.display(postComment);
			api.reactToPost(baseURL);
			displayOnScroll();
		});
	});
}

create.displayPost(posts);
comment.display(postComment);
api.reactToPost(baseURL);
displayOnScroll();
displayBySort();
comment.process(postComment);
viewPostById();

console.log(posts);

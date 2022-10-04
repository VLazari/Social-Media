const baseURL = "https://nf-api.onrender.com/api/v1/social";
import * as api from "/js/modules/API-access.mjs";
import { currentUser } from "/js/modules/user-data.mjs";

function createElement(elementName, classNames) {
	const element = document.createElement(`${elementName}`);
	element.className = `${classNames}`;
	return element;
}

export function displayPost(posts) {
	const mainPosts = document.querySelector(".posts");
	posts.forEach((post) => {
		const wrapContainer = createElement("div", "card mx-0 my-3 bg-light border border-primary rounded border-opacity-25");
		wrapContainer.id = post.id;

		const postAuthor = createElement("a", "p-3 d-flex align-items-center");
		postAuthor.href = `/pages/profile.html?name=${post.author.name}`;
		wrapContainer.appendChild(postAuthor);

		const avatarImg = createElement("div", "mx-3 avatar-img");
		avatarImg.style.backgroundImage = `url("${post.author.avatar}")`;
		postAuthor.appendChild(avatarImg);

		const authorName = createElement("h6", "m-0 user-name");
		authorName.innerText = post.author.name;
		postAuthor.appendChild(authorName);

		const wrapImg = createElement("img", "");
		wrapImg.src = post.media;
		wrapImg.setAttribute("alt", "Post image");
		wrapContainer.appendChild(wrapImg);

		const cardBody = createElement("div", "card-body");
		wrapContainer.appendChild(cardBody);

		const postHeart = createElement("i", "fa-regular fa-heart fa-xl mx-2 text-danger");
		postHeart.dataset.postId = post.id;
		cardBody.appendChild(postHeart);

		const heartCount = createElement("small", "");
		heartCount.innerText = post._count.reactions;
		cardBody.appendChild(heartCount);

		const postComment = createElement("i", "fa-regular fa-comment fa-xl mx-2 text-primary");
		postComment.dataset.postId = post.id;
		postComment.dataset.bsToggle = "modal";
		postComment.dataset.bsTarget = "#commentModal";
		cardBody.appendChild(postComment);

		const commentCount = createElement("small", "");
		commentCount.innerText = post._count.comments;
		cardBody.appendChild(commentCount);

		const wrapTitle = createElement("div", "card-body card-text fw-semibold my-0 py-0");
		wrapTitle.innerText = post.title;
		wrapContainer.appendChild(wrapTitle);

		const wrapBody = createElement("div", "card-body card-text my-0 py-0");
		wrapBody.innerText = post.body;
		wrapContainer.appendChild(wrapBody);

		const wrapDate = createElement("div", "card-text m-2 mx-3");
		wrapContainer.appendChild(wrapDate);

		const dateTime = createElement("small", "text-muted");
		dateTime.innerText = post.updated.substr(11, 5);
		wrapDate.appendChild(dateTime);

		const dateDay = createElement("small", "text-muted mx-2");
		dateDay.innerText = post.updated.substr(0, 10);
		wrapDate.appendChild(dateDay);
		mainPosts.appendChild(wrapContainer);
	});
}

export async function displayComments(id) {
	const postUrl = baseURL + `/posts/${id}?_author=true&_comments=true`;
	const postData = await api.getData(postUrl);
	const modalHeader = document.getElementById("comment-header");
	const modalBody = document.getElementById("comment-body");
	console.log(postData);

	modalHeader.innerHTML = "";
	modalBody.innerHTML = "";

	const container = createElement("div", "d-flex align-items-center");
	modalHeader.appendChild(container);

	const avatar = createElement("div", "mx-2 avatar-img");
	avatar.style.backgroundImage = `url("${postData.author.avatar}")`;
	container.appendChild(avatar);

	const author = createElement("h5", "m-0 text-primary");
	author.innerText = postData.author.name;
	container.appendChild(author);

	const title = createElement("p", "mx-3 my-0");
	title.innerText = postData.title;
	modalHeader.appendChild(title);

	postData.comments.forEach((comment) => {
		const message = createElement("div", "d-flex align-items-center");
		modalBody.appendChild(message);

		const name = createElement("h6", " m-0 mx-1 text-primary");
		name.innerText = `${comment.owner}: `;
		message.appendChild(name);

		const comm = createElement("p", "m-0 fs-6");
		comm.innerText = comment.body;
		message.appendChild(comm);

		const time = createElement("small", "text-muted comm-date");
		time.innerText = comment.created.substr(11, 5);
		modalBody.appendChild(time);

		const day = createElement("small", "text-muted mx-2 comm-date");
		day.innerText = comment.created.substr(0, 10);
		modalBody.appendChild(day);
	});
}

export function sendComment(id) {
	const message = document.getElementById("comment-input");
	const url = baseURL + `/posts/${id}/comment`;
	const options = {
		method: "POST",
		body: JSON.stringify({
			body: message.value,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: currentUser.token,
		},
	};
	api.postData(url, options);
}

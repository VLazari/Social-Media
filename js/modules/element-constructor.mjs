const baseURL = "https://nf-api.onrender.com/api/v1/social";
import * as api from "/js/modules/API-access.mjs";

/**
 * Create an element with it's class
 * @param {string} elementName Type of element to create.
 * @param {string} classNames Elements class names,
 * @returns element with set class names.
 */
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
		mainPosts.appendChild(wrapContainer);

		const postAuthor = createElement("a", "p-3 d-flex align-items-center");
		postAuthor.href = `/pages/profile.html?name=${post.author.name}`;
		wrapContainer.appendChild(postAuthor);

		const avatarImg = createElement("div", "mx-3 avatar-img");
		let avatarImgUrl = "https://xsgames.co/randomusers/avatar.php?g=female";
		if (post.author.avatar.trim() != "") {
			avatarImgUrl = post.author.avatar;
		}
		avatarImg.style.backgroundImage = `url("${avatarImgUrl}")`;
		postAuthor.appendChild(avatarImg);

		const authorName = createElement("h6", "m-0 user-name");
		authorName.innerText = post.author.name;
		postAuthor.appendChild(authorName);

		const wrapImg = createElement("img", "");
		let i = Math.floor(Math.random() * 100);
		let mediaImg = `https://picsum.photos/800/600?random=${i}`;
		if (post.media.trim() != "") {
			mediaImg = post.media;
		}
		wrapImg.src = mediaImg;
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
		dateDay.innerText = post.created.substr(0, 10);
		wrapDate.appendChild(dateDay);
	});
}

export async function displayComments(id) {
	const postUrl = baseURL + `/posts/${id}?_author=true&_comments=true`;
	const postData = await api.getData(postUrl);
	const modalHeader = document.getElementById("comment-header");
	const modalBody = document.getElementById("comment-body");

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

		const name = createElement("h6", " m-0 mx-1 mt-1 text-primary  align-self-start");
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

export function profilePosts(data, displayClass) {
	const mainPosts = document.querySelector(".posts");
	data.posts.forEach((post) => {
		const card = createElement("div", "card mx-0 my-3 bg-light border border-primary rounded border-opacity-25");
		card.id = post.id;
		mainPosts.appendChild(card);

		const cardHead = createElement("div", "p-3 d-flex align-items-center justify-content-between");
		card.appendChild(cardHead);

		const headInfo = createElement("div", "d-flex align-items-center");
		cardHead.appendChild(headInfo);

		const avatar = createElement("div", "mx-3 avatar-img");
		let avatarImgUrl = "https://xsgames.co/randomusers/avatar.php?g=female";
		if (data.avatar.trim() != "") {
			avatarImgUrl = data.avatar;
		}
		avatar.style.backgroundImage = `url("${avatarImgUrl}")`;
		headInfo.appendChild(avatar);

		const name = createElement("h6", "m-0 user-name");
		name.innerText = data.name;
		headInfo.appendChild(name);

		const headAction = document.createElement("div");
		cardHead.appendChild(headAction);

		const editPost = createElement("i", `fa-solid fa-file-pen fa-lg mx-3 text-primary ${displayClass}`);
		editPost.dataset.bsToggle = "modal";
		editPost.dataset.bsTarget = "#addPostModal";
		editPost.dataset.postId = post.id;
		editPost.dataset.title = post.title;
		editPost.dataset.body = post.body;
		editPost.dataset.tag = post.tag;
		editPost.dataset.media = post.media;
		headAction.appendChild(editPost);

		const delPost = createElement("i", `fa-solid fa-trash fa-lg mx-3 text-danger ${displayClass}`);
		delPost.dataset.postId = post.id;
		headAction.appendChild(delPost);

		const img = createElement("img", "");
		let i = Math.floor(Math.random() * 100);
		let mediaImg = `https://picsum.photos/800/600?random=${i}`;
		if (post.media.trim() != "") {
			mediaImg = post.media;
		}
		img.src = mediaImg;
		img.setAttribute("alt", "Post image");
		card.appendChild(img);

		const bottomAction = createElement("div", "card-body");
		card.appendChild(bottomAction);

		const like = createElement("i", "fa-regular fa-heart fa-xl mx-2 text-danger");
		like.dataset.postId = post.id;
		bottomAction.appendChild(like);

		const comment = createElement("i", "fa-regular fa-comment fa-xl mx-2 text-primary");
		comment.dataset.postId = post.id;
		comment.dataset.bsToggle = "modal";
		comment.dataset.bsTarget = "#commentModal";
		bottomAction.appendChild(comment);

		const title = createElement("div", "card-body py-0 fw-semibold");
		title.innerText = post.title;
		card.appendChild(title);

		const body = createElement("div", "card-body py-0");
		body.innerText = post.body;
		card.appendChild(body);

		const wrapDate = createElement("div", "card-text m-2 mx-3");
		card.appendChild(wrapDate);

		const dateTime = createElement("small", "text-muted");
		dateTime.innerText = post.updated.substr(11, 5);
		wrapDate.appendChild(dateTime);

		const dateDay = createElement("small", "text-muted mx-2");
		dateDay.innerText = post.updated.substr(0, 10);
		wrapDate.appendChild(dateDay);
	});
}

export function displaySearchResults(results, userAvatar, userName) {
	const container = createElement("a", "d-flex align-items-center mb-3");
	container.href = `/pages/profile.html?name=${userName}`;
	results.appendChild(container);

	const avatar = createElement("div", "mx-3 avatar-img");
	avatar.style.backgroundImage = `url("${userAvatar}")`;
	container.appendChild(avatar);

	const name = createElement("h6", "m-0 user-name");
	name.innerText = userName;
	container.appendChild(name);
}

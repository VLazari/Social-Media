import { currentUser } from "./user-data.mjs";

/**
 * Make an API GET request and returns the response promise.
 * @param {string} url API URL for the get request
 * @returns {array of objects} As a promise
 */
export async function getData(url) {
	const options = {
		headers: {
			Authorization: currentUser.token,
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();
	return data;
}

export async function postData(url, options) {
	const response = await fetch(url, options);
	if (response.status == 200) {
		location.reload();
	}
	// const data = await response.json();
}

export function addPostBody(title, body, tag, media) {
	const options = {
		method: "POST",
		body: JSON.stringify({
			title: title,
			body: body,
			tags: tag,
			media: media,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: currentUser.token,
		},
	};
	return options;
}

export function deletePost(url) {
	fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: currentUser.token,
		},
	}).then((response) => {
		if (response.status == 200) {
			location.reload();
		}
	});
}

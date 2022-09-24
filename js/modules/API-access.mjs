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

/**
 * Makes an API POST request and reload the page.
 * @param {string} url API POST request URL
 * @param {object} options POST request body and method
 */
export async function postData(url, options) {
	const response = await fetch(url, options);
	if (response.status == 200) {
		location.reload();
	}
}

/**
 * Create the option body for the POST request function
 * @param {string} title Post title
 * @param {string} body Post body
 * @param {string} tag Post tag
 * @param {string} media Post image
 * @returns {object} An object named "options",
 * that contain the body for the POST request with specified data.
 */
export function addPostBody(method, title, body, tag, media) {
	const options = {
		method: method,
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

/**
 * Delete the post with specified post id.
 * @param {string} url API URL with post id.
 */
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

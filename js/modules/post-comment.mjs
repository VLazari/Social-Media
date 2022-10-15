import * as create from "/js/modules/element-constructor.mjs";
import * as api from "/js/modules/API-access.mjs";

/**
 * Connects the comment modal to the respective post with post id.
 * @param {DOM element} postComment DOM element for submitting the comment.
 */
export function display(postComment) {
	const comments = document.querySelectorAll(".fa-comment");
	comments.forEach((comm) => {
		comm.addEventListener("click", () => {
			postComment.dataset.id = comm.dataset.postId;
			create.displayComments(comm.dataset.postId);
		});
	});
}

/**
 * Add the comment to the post and displays it in the comment modal window.
 * @param {DOM element} postComment DOM element for submitting the comment.
 */
export function process(postComment) {
	postComment.addEventListener("click", async () => {
		await api.sendComment(postComment.dataset.id);
		create.displayComments(postComment.dataset.id);
	});
}

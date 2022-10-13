import * as create from "/js/modules/element-constructor.mjs";
import * as api from "/js/modules/API-access.mjs";

export function display(postComment) {
	const comments = document.querySelectorAll(".fa-comment");
	comments.forEach((comm) => {
		comm.addEventListener("click", () => {
			postComment.dataset.id = comm.dataset.postId;
			create.displayComments(comm.dataset.postId);
		});
	});
}

export function process(postComment) {
	postComment.addEventListener("click", async () => {
		await api.sendComment(postComment.dataset.id);
		create.displayComments(postComment.dataset.id);
	});
}

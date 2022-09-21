export const currentUser = {
	name: localStorage.getItem("name"),
	email: localStorage.getItem("email"),
	avatar: localStorage.getItem("avatar"),
	token: `Bearer ${localStorage.getItem("token")}`,
};

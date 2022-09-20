// >>> Checks if the user is logged in. <<<

export default function isLogin() {
	if (localStorage.getItem("token") == undefined) {
		return false;
	} else {
		return true;
	}
}

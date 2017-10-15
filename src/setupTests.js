global.requestAnimationFrame = function(callback) {
	setTimeout(callback, 0);
};

global.localStorage = {};
global.localStorage.getItem = () => {
	return null;
}
global.localStorage.setItem = () => {
	return null;
}
global.localStorage.removeItem = () => {
	return null;
}
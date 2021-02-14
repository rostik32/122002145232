export const storage = {
	save(data, key) {
		localStorage.setItem(key, JSON.stringify(data));
	},

	fetch(key) {
		return JSON.parse(localStorage.getItem(key));
	},
};

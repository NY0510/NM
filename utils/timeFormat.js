module.exports.timeFormat = ms => {
	var pad = function (n) {
		return n < 10 ? "0" + n : n;
	};

	var ms = ms || 0;
	var sec = Math.floor(ms / 1000);
	var min = Math.floor(sec / 60);
	var hrs = Math.floor(min / 60);

	sec -= min * 60;
	min -= hrs * 60;

	return pad(hrs) + ":" + pad(min) + ":" + pad(sec);
};

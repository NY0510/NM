module.exports.textLengthOverCut = (txt, len, lastTxt) => {
	if (len == "" || len == null) {
		// 기본값
		len = 20;
	}
	if (lastTxt == "" || lastTxt == null) {
		// 기본값
		lastTxt = "...";
	}
	if (txt.length > len) {
		txt = txt.substr(0, len) + lastTxt;
	}
	return txt;
};

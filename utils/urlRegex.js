module.exports.urlRegex = url => {
	const youtube = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const sondcloud = /^(https?:\/\/)?(www\.)?(soundcloud\.com)\/.+$/gi;
	const spotify = /^(https?:\/\/)?(open\.spotify\.com)\/.+$/gi;

	return youtube.test(url) || sondcloud.test(url) || spotify.test(url);
};

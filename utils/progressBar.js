module.exports.progressBar = player => {
	//[ ●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ]
	const progress = (Math.floor(player.position / 1000) / Math.floor(player.queue.current.duration / 1000)) * 100;
	let bar = "";
	for (let i = 0; i != Math.floor(progress / 10); i++) {
		bar += "▬";
	}
	bar += "●";
	for (let i = 10; i != Math.floor(progress / 10); i--) {
		bar += "▬";
	}
	return `**[ ${bar} ]**`;
};

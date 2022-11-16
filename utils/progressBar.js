const prograss_bar = {
	leftindicator: "[",
	rightindicator: "]",

	slider: "●",
	size: 25,
	line: "▬",
};

module.exports.progressBar = player => {
	let { size, line, slider, leftindicator, rightindicator } = prograss_bar;
	if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}${rightindicator}**\n00:00:00 / 00:00:00`;
	let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
	let total = player.queue.current.duration;

	let bar =
		current > total
			? [line.repeat((size / 2) * 2), (current / total) * 100]
			: [line.repeat(Math.round((size / 2) * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
	if (!String(bar).includes(slider)) return `**${leftindicator}${slider}${line.repeat(size - 1)}${rightindicator}**\n00:00:00 / 00:00:00`;
	return `**${leftindicator}${bar[0]}${rightindicator}**\n${
		new Date(player.position).toISOString().substr(11, 8) +
		" / " +
		(player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))
	}`;
};

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { textLengthOverCut } = require("../utils/textLengthOverCut");

module.exports = {
	name: "queue",
	aliases: ["큐", "대기열", "재생목록", "벼뎓"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const queue = player.queue;
		const e = new EmbedBuilder().setTitle("📋 현재 대기열").setColor(process.env.COLOR_NORMAL);

		const tracks = queue.slice(0, 30);

		if (queue.current) {
			title = textLengthOverCut(queue.current.title.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...");

			e.setDescription(
				`**💿 [${title}](${queue.current.uri})**\n\n${tracks
					.map((track, i) => `**${i + 1}. [${textLengthOverCut(track.title.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...")}](${track.uri})**`)
					.join("\n")}`
			);
		}

		return message.reply({ embeds: [e] });
	},
};

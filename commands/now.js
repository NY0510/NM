require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { timeFormat } = require("../utils/timeFormat");
const { textLengthOverCut } = require("../utils/textLengthOverCut");
const { progressBar } = require("../utils/progressBar");

module.exports = {
	name: "now",
	aliases: ["np", "현재", "ㅜㅐㅈ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		// if (!channel)
		// 	return message.reply({
		// 		embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요**`).setColor(process.env.COLOR_ERROR)],
		//
		// 	});

		title = textLengthOverCut(player.queue.current.title.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...");
		return message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(`🎵 현재 재생중인 음악`)
					.setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
					.setDescription(
						`${player.playing ? "▶️" : "⏸️"} **[${title}](${player.queue.current.uri})**\n\n${progressBar(player)}\n**\`${timeFormat(player.position)} / ${timeFormat(
							player.duration
						)}**\``
					)
					.addFields(
						{
							name: "⌛ 곡 길이",
							value: ` ┕** ${player.queue.current.isStream ? "LIVE" : timeFormat(player.queue.current.duration)}**`,
							inline: true,
						},
						{
							name: "🔂 남은 대기열",
							value: ` ┕** ${player.queue.length}곡**`,
							inline: true,
						}
					)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

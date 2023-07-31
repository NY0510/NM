require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const helpData = require("../data/help.json");

module.exports = {
	name: "clear",
	aliases: ["대기열비우기", "클리어", "칟ㅁㄱ", "c"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		const previousQueueSize = player.queue.size;
		player.queue.clear();

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${process.env.EMOJI_CHECK} **${title} 대기열에 있는 노래 ${previousQueueSize}곡을 비웠어요**`)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

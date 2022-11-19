require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "pause",
	aliases: ["일시정지", "ㅔ면ㄷ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		if (!channel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요!**`).setColor(process.env.COLOR_ERROR)],
			});

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (player.paused)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음악이 이미 일시정지 상태에요!**`).setColor(process.env.COLOR_ERROR)],
			});

		player.pause(true);
		return message.reply({ embeds: [new EmbedBuilder().setDescription(`⏸️ **재샹중인 음악을 일시정지 했어요!**`).setColor(process.env.COLOR_NORMAL)] });
	},
};

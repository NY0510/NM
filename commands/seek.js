require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "seek",
	aliases: ["ㄴㄷ다"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);
		if (!player)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (!args[0])
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		const time = args[0].split(":");
		const seconds = time[0] * 60 + time[1] * 1;

		if (isNaN(seconds))
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		player.seek(seconds * 1000);
		message.reply({
			embeds: [new EmbedBuilder().setDescription(`**\`${args[0]}\`**으로 이동했어요!`).setColor(process.env.COLOR_NORMAL)],
		});
	},
};

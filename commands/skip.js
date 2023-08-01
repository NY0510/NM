require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "skip",
	aliases: ["스킵", "건너뛰기", "나ㅑㅔ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		// if (!channel)
		// 	return await message.reply({
		// 		embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요**`).setColor(process.env.COLOR_ERROR)],
		//
		// 	});

		if (channel.id !== player.voiceChannel)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		player.stop();
		return await message.reply({
			embeds: [new EmbedBuilder().setDescription(`⏭️ **음악을 스킵했어요**`).setColor(process.env.COLOR_NORMAL)],
		});
	},
};

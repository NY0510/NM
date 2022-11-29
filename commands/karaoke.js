require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "karaoke",
	aliases: ["노래방", "MR제거", "mr제거", "ㅏㅁㄱ매ㅏㄷ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		// if (!channel)
		// 	return message.reply({
		// 		embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요!**`).setColor(process.env.COLOR_ERROR)],
		//
		// 	});

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		player.karaoke = !player.karaoke;
		player.rotation = false;

		return message.reply({
			embeds: [
				new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **노래방 효과를 ${player.karaoke ? "설정" : "해제"}했어요!**`).setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

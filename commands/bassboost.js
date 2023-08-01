require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "bassboost",
	aliases: ["베이스부스트", "ㅠㅁㄴ뉴ㅐㅐㄴㅅ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
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

		if (!player.customBassboost) bass = 0.17;
		else bass = 0;

		const bands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: bass }));
		player.setEQ(...bands);
		player.customBassboost = !player.customBassboost;

		return await message.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${process.env.EMOJI_CHECK} **베이스부스트를 ${player.customBassboost ? "설정" : "해제"}했어요**`)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

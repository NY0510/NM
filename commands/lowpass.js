require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "lowpass",
	aliases: ["로우패스", "ㅣㅐ젬ㄴㄴ"],

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

		if (!player.customLowpass) lowpass = -0.3;
		else lowpass = 0;

		const zeroBands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: lowpass }));
        const bands = zeroBands.concat(new Array(3).fill(null).map((_, i) => ({ band: i, gain: 0 })));
		player.setEQ(...bands);
		player.customLowpass = !player.customLowpass;

		return message.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${process.env.EMOJI_CHECK} **로우패스를 ${player.customBassboost ? "설정" : "해제"}했어요!**`)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["음량", "패ㅣㅕㅡㄷ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);
		const volume = args[0];

		if (!player)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (!volume)
			return message.reply({
				embeds: [new EmbedBuilder().setTitle(`🔊 현재 볼륨은 **\`${player.volume}%\`**에요`).setColor(process.env.COLOR_NORMAL)],
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

		if (!volume || volume < 1 || volume > 100)
			return message.reply({
				embeds: [new EmbedBuilder().setTitle(`${process.env.EMOJI_X} 볼륨은 1에서 100사이의 숫자만 입력해주세요`).setColor(process.env.COLOR_ERROR)],
			});

		player.setVolume(volume);
		message.reply({
			embeds: [new EmbedBuilder().setTitle(`🔊 볼륨을 **\`${volume}%\`**(으)로 변경했어요!`).setColor(process.env.COLOR_NORMAL)],
		});
	},
};

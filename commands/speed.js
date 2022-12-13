require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "speed",
	aliases: ["배속", "속도"],

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
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **조절할 속도를 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		let speed = Math.round(args[0], 1) || 1;
		if (speed < 1 || speed > 30)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **속도는 1에서 30사이의 숫자만 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (!player.rotation) speed = speed * 0.1;
		else speed = 0;

		player.node.send({
			guildId: message.guild.id,
			timescale: {
				speed: 1.2,
			},
		});

		return message.reply({
			embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **속도를 ${args[0]}배로 조절했어요**`).setColor(process.env.COLOR_SUCCESS)],
		});
	},
};

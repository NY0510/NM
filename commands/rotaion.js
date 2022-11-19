require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "rotation",
	aliases: ["회전", "갯ㅁ샤ㅐㅜ", "3d", "3D"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
				ephemeral: true,
			});

		const { channel } = message.member.voice;

		if (!channel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요!**`).setColor(process.env.COLOR_ERROR)],
				ephemeral: true,
			});

		let speed = Math.round(args[0], 1) || 2;
		if (speed < 1 || speed > 10)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **속도는 1에서 10사이의 숫자만 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
				ephemeral: true,
			});

		if (!player.rotation) speed = speed * 0.1;
		else speed = 0;

		console.log(speed);

		player.node.send({
			op: "filters",
			guildId: message.guild.id,
			rotation: {
				rotationHz: speed,
			},
		});
		player.rotation = !player.rotation;

		return message.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${process.env.EMOJI_CHECK} **3D 오디오 효과를 ${player.rotation ? "설정" : "해제"}했어요! ${player.rotation ? `(${speed * 10})` : ""}**`)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

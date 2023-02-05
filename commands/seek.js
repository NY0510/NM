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
		if (time.length > 3)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 형식으로 시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		let seconds = 0;
		if (time.length === 1) seconds = Number(time[0]);
		if (time.length === 2) seconds = Number(time[0]) * 60 + Number(time[1]);
		if (time.length === 3) seconds = Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);

		if (seconds > player.queue.current.duration / 1000)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 형식으로 시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		try {
			player.seek(player.position + seconds * 1000);
		} catch (RangeError) {
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 형식으로 시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});
		}

		return message.reply({ embeds: [new EmbedBuilder().setDescription(`⏩ **${args[0]}**초 앞으로 이동했어요`).setColor(process.env.COLOR_NORMAL)] });
	},
};

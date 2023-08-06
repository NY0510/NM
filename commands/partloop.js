require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "partloop",
	aliases: ["구간반복", "ㅔㅁㄱ시ㅐㅐㅔ", "구반"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		if (channel.id !== player.voiceChannel)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (!args[0])
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		const startTime = args[0].split(":"),
			endTime = args[1].split(":");
		if (startTime.length > 3 || endTime.length > 3)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 형식으로 시간을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		let startSecond = 0,
			endSecond = 0;

		if (startTime.length === 1) startSecond = Number(startTime[0]);
		if (startTime.length === 2) startSecond = Number(startTime[0]) * 60 + Number(startTime[1]);
		if (startTime.length === 3) startSecond = Number(startTime[0]) * 3600 + Number(startTime[1]) * 60 + Number(startTime[2]);

		if (endTime.length === 1) endSecond = Number(endTime[0]);
		if (endTime.length === 2) endSecond = Number(endTime[0]) * 60 + Number(endTime[1]);
		if (endTime.length === 3) endSecond = Number(endTime[0]) * 3600 + Number(endTime[1]) * 60 + Number(endTime[2]);

		if (startSecond < 0 || endSecond <= startSecond)
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 시간의 범위로 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		const currentSongTime = player.position;
		player.setTrackRepeat(false);
		player.setQueueRepeat(false);

		player.loopData = {
			startTime: startSecond * 1000,
			endTime: endSecond * 1000,
		};

		await message.reply(`반복설정됨 ${args[0]}~${args[1]}`);
	},
};

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "loop",
	aliases: ["반복", "ㄱ덷ㅁㅅ", "repeat", "ㅣㅐㅐㅔ"],

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

		// player.setTrackRepeat(!player.trackRepeat);

		// return await message.reply({
		// 	embeds: [new EmbedBuilder().setDescription(`🔁 **현재 곡 반복을 ${player.trackRepeat ? "설정" : "해제"}했어요**`).setColor(process.env.COLOR_NORMAL)],
		// });

		if (args[0] === "track" || !args[0]) {
			if (player.trackRepeat === false) {
				await player.setTrackRepeat(true);

				return await message.reply({
					embeds: [new EmbedBuilder().setDescription(`🔁 **현재 곡 반복을 ${player.trackRepeat ? "설정" : "해제"}했어요**`).setColor(process.env.COLOR_NORMAL)],
				});
			} else {
				await player.setTrackRepeat(false);

				return await message.reply({
					embeds: [new EmbedBuilder().setDescription(`🔁 **현재 곡 반복을 ${player.trackRepeat ? "설정" : "해제"}했어요**`).setColor(process.env.COLOR_NORMAL)],
				});
			}
		} else if (args[0] === "queue") {
			if (player.queueRepeat === true) {
				await player.setQueueRepeat(false);

				return await message.reply({
					embeds: [new EmbedBuilder().setDescription(`🔁 **대기열 반복을 ${player.queueRepeat ? "설정" : "해제"}했어요**`).setColor(process.env.COLOR_NORMAL)],
				});
			} else {
				await player.setQueueRepeat(true);

				return await message.reply({
					embeds: [new EmbedBuilder().setDescription(`🔁 **대기열 반복을 ${player.queueRepeat ? "설정" : "해제"}했어요**`).setColor(process.env.COLOR_NORMAL)],
				});
			}
		}
	},
};

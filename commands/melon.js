require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const request = require("request");

module.exports = {
	name: "melon",
	aliases: ["멜론", "멜론차트", "ㅁㄹㅊㅌ", "ㅡ디ㅐㅜ"],

	run: async (client, message, args) => {
		const player = client.manager.get(message.guild.id);

		if (!player || !player?.queue?.current?.title)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const { channel } = message.member.voice;

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		const message = message.reply({
			embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_LOADING} **멜론차트를 불러오는 중이에요**`).setColor(process.env.COLOR_NORMAL)],
		});

		const url = "https://api.viento.me/melonChart";
		request(url, (err, res, body) => {
			if (err)
				return message.edit({
					embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **멜론차트를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
				});

			const data = JSON.parse(body.data);
			data.forEach(async (song, index) => {
				const res = await client.manager.search(`${song.title} ${song.singer}`, message.author);
				if (!res || !res.tracks[0])
					return message.reply({
						embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **멜론차트를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
					});

				player.queue.add(res.tracks[0]);
				message.edit({
					embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **${song.rank}위 ${song.title}**`).setColor(process.env.COLOR_NORMAL)],
				});
			});
		});

		return message.edit({
			embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **멜론차트를 불러왔어요**`).setColor(process.env.COLOR_NORMAL)],
		});
	},
};

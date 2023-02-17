require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const request = require("request");

module.exports = {
	name: "melon",
	aliases: ["멜론", "멜론차트", "ㅁㄹㅊㅌ", "ㅡ디ㅐㅜ"],

	run: async (client, message, args) => {
		let player = client.manager.get(message.guild.id);
		const { channel } = message.member.voice;

		if (!channel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요**`).setColor(process.env.COLOR_ERROR)],
			});

		player = await client.manager.create({
			guild: message.guild.id,
			voiceChannel: channel.id,
			textChannel: message.channel.id,
			selfDeafen: true,
			volume: 70,
		});
		const bindChannel = client.channels.cache.get(player.textChannel);

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		// 음성채널 접속
		if (player.state != "CONNECTED" && player.state != "CONNECTING") {
			await player.connect();
			await message.reply({
				embeds: [
					new EmbedBuilder().setDescription(`> **🔊 <#${channel.id}> 접속 완료!**\n> **🧾 <#${player.textChannel}> 채널에 바인딩!**`).setColor(process.env.COLOR_NORMAL),
				],
			});
		}

		if (channel.id !== player.voiceChannel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **저와 같은 음성채널에 접속해 있지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		await message
			.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_LOADING} **멜론차트를 50곡을 불러오는 중이에요**`).setColor(process.env.COLOR_NORMAL)],
			})
			.then(async msg => {
				const url = "https://api.viento.me/melonChart";
				request(url, async (err, res, body) => {
					if (err)
						return await bindChannel.send({
							embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **멜론차트를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
						});

					const data = JSON.parse(body).data;

					for (let i = 0; i < data.length; i++) {
						const res = await client.manager.search(`${data[i].title} ${data[i].singer}`, message.author);
						if (!res || !res.tracks[0])
							return await bindChannel.send({
								embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **멜론차트를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
							});

						player.queue.add(res.tracks[0]);
						await msg.edit({
							embeds: [
								new EmbedBuilder()
									.setDescription(`${process.env.EMOJI_LOADING} **멜론차트를 50곡을 불러오는 중이에요 (${i + 1}/50)**`)
									.setColor(process.env.COLOR_NORMAL),
							],
						});
					}

					// await data.forEach(async (song, index) => {
					// 	const res = await client.manager.search(`${song.title} ${song.singer}`, message.author);
					// 	if (!res || !res.tracks[0])
					// 		return await bindChannel.send({
					// 			embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **멜론차트를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
					// 		});

					// 	player.queue.add(res.tracks[0]);
					// 	await bindChannel.send({
					// 		embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **${song.rank}위 ${song.title}**`).setColor(process.env.COLOR_NORMAL)],
					// 	});
					// });

					if (!player.playing && !player.paused) player.play();
					return await msg.edit({
						embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **멜론차트를 불러왔어요**`).setColor(process.env.COLOR_NORMAL)],
					});
				});
			});
	},
};

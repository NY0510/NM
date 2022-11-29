require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { timeFormat } = require("../utils/timeFormat");
const { textLengthOverCut } = require("../utils/textLengthOverCut");
const { urlRegex } = require("../utils/urlRegex");

module.exports = {
	name: "play",
	aliases: ["p", "ㅔ", "재생", "ㅔㅣ묘"],

	run: async (client, message, args) => {
		const query = args.join(" ");
		const { channel } = message.member.voice;

		if (!channel)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요!**`).setColor(process.env.COLOR_ERROR)],
			});

		const player = await client.manager.create({
			guild: message.guild.id,
			voiceChannel: channel.id,
			textChannel: message.channel.id,
			selfDeafen: true,
			volume: 50,
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

		if (!query)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **검색어를 입력해주세요!**`).setColor(process.env.COLOR_ERROR)],
			});

		// if (!urlRegex(query))
		// 	return message.reply({ embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **지원되는 URL이 아니에요**`).setColor(process.env.COLOR_ERROR)] });

		let res;

		// 음악 검색
		try {
			res = await player.search(query, message.author);
			if (res.loadType === "LOAD_FAILD") {
				if (!player.query.current) player.destroy();
				bindChannel.send({
					embeds: [
						new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음악 검색 도중 오류가 발생했어요**\n**\`${err.message}\`**`).setColor(process.env.COLOR_ERROR),
					],
				});
				throw res.exception;
			}
		} catch (err) {
			return bindChannel.send({
				embeds: [
					new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음악 검색 도중 오류가 발생했어요**\n**\`${err.message}\`**`).setColor(process.env.COLOR_ERROR),
				],
			});
		}

		switch (res.loadType) {
			case "NO_MATCHES":
				console.log("NO_MATCHES");
				if (!player.queue.current) player.destroy();
				return bindChannel.send({
					embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **아쉽지만, 검색 결과가 없어요**`).setColor(process.env.COLOR_ERROR)],
				});

			case "TRACK_LOADED":
				player.queue.add(res.tracks, message.author);

				if (!player.playing && !player.paused && !player.queue.size) player.play();
				title = textLengthOverCut(res.tracks[0].title.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...");
				e = new EmbedBuilder()
					.setTitle(`💿 음악을 대기열에 추가했어요`)
					.setDescription(`**[${title}](${res.tracks[0].uri})**`)
					.setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
					// .setFooter({ text: `요청자: ${message.author.tag}` })
					.addFields(
						{
							name: "⌛ 곡 길이",
							value: ` ┕** ${res.tracks[0].isStream ? "LIVE" : timeFormat(res.tracks[0].duration)}**`,
							inline: true,
						},
						{
							name: "🔂 남은 대기열",
							value: ` ┕** ${player.queue.length}곡**`,
							inline: true,
						}
					)
					.setColor(process.env.COLOR_NORMAL);
				return await message.reply({ embeds: [e] });

			case "PLAYLIST_LOADED":
				player.queue.add(res.tracks, message.author);

				// 재생목록 총 길이
				// let duration = 0;
				// res.tracks.forEach(i => {
				// 	duration += i.duration;
				// });

				if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();

				title = textLengthOverCut(res.playlist.name.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...");
				return message.reply({
					embeds: [
						new EmbedBuilder()
							.setTitle(`📀 재생목록을 대기열에 추가했어요`)
							.setDescription(`**[${title}](${res.playlist.url})**`)
							.setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
							// .setFooter({ text: `요청자: ${interaction.user.tag}` })
							.addFields(
								{
									name: "⌛ 총 길이",
									value: ` ┕** ${timeFormat(res.playlist.duration)}**`,
									inline: true,
								},
								{
									name: "🎵 트렉 개수",
									value: ` ┕** ${res.tracks.length}곡**`,
									inline: true,
								}
							)
							.setColor(process.env.COLOR_NORMAL),
					],
				});

			case "SEARCH_RESULT":
				const track = res.tracks[0];
				player.queue.add(track, message.author);

				title = textLengthOverCut(res.tracks[0].title.replaceAll("[", "［").replaceAll("]", "］"), 30, " ...");
				e = new EmbedBuilder()
					.setTitle(`💿 음악을 대기열에 추가했어요`)
					.setDescription(`**[${title}](${res.tracks[0].uri})**`)
					.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
					// .setFooter({ text: `요청자: ${message.author.tag}` })
					.addFields(
						{
							name: "⌛ 곡 길이",
							value: ` ┕** ${track.isStream ? "LIVE" : timeFormat(track.duration)}**`,
							inline: true,
						},
						{
							name: "🔂 남은 대기열",
							value: ` ┕** ${player.queue.length}곡**`,
							inline: true,
						}
					)
					.setColor(process.env.COLOR_NORMAL);
				await bindChannel.send({ embeds: [e] });

				if (!player.playing && !player.paused && !player.queue.size) player.play();

			default:
				console.log(res.loadType);
		}
	},
};

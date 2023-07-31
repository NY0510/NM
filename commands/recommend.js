require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const youtubesearchapi = require("youtube-search-api");

module.exports = {
	name: "recommend",
	aliases: ["추천", "suggestion", "ㄱㄷ채ㅡㅡ둥", "r"],

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

		const nowPlayingYoutubeId = player.queue.current.uri.split("?v=")[1];

		if (!nowPlayingYoutubeId)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X}} **현재 재생중인 곡이 유튜브 영상이 아니여서 해당 기능 이용이 불가능해요`)],
			});

		const recommendVideos = await youtubesearchapi.GetVideoDetails(nowPlayingYoutubeId);

		await message
			.reply({
				embeds: [
					new EmbedBuilder()
						.setDescription(`${process.env.EMOJI_LOADING} **현재 재생중인 곡을 기반으로 한 추천 노래 10곡을 불러오는 중이에요**`)
						.setColor(process.env.COLOR_NORMAL),
				],
			})
			.then(async msg => {
				const data = recommendVideos.suggestion;

				for (let i = 0; i < 10; i++) {
					const res = await client.manager.search(`https://youtube.com/watch?v=${data[i].id}`, message.author);
					if (!res || !res.tracks[0])
						return await bindChannel.send({
							embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **추천 노래를 불러오는데 실패했어요**`).setColor(process.env.COLOR_ERROR)],
						});

					player.queue.add(res.tracks[0]);
					await msg.edit({
						embeds: [
							new EmbedBuilder()
								.setDescription(`${process.env.EMOJI_LOADING} **추천 노래 10곡을 불러오는 중이에요 (${i + 1}/10)**`)
								.setColor(process.env.COLOR_NORMAL),
						],
					});

					if (!player.playing && !player.paused && i == 1) player.play();
				}

				return await msg.edit({
					embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **추천 노래를 불러왔어요**`).setColor(process.env.COLOR_NORMAL)],
				});
			});

		// let videoCount = 0;
		// Object.keys(recommendVideos.suggestion).forEach(async video => {
		// 	const videoId = recommendVideos.suggestion[video].id;
		// 	const res = await client.manager.search(`https://youtube.com/watch?v=${videoId}`, message.author);
		// 	await player.queue.add(res.tracks, message.author);
		// 	videoCount++;
		// });
		// console.log(`Video count: ${videoCount}`);

		// await message.channel.send({
		// 	embeds: [
		// 		new EmbedBuilder()
		// 			.setDescription(`${process.env.EMOJI_CHECK} **현재 재생중인 곡을 기반으로 한 추천 노래 ${videoCount}개를 추가했어요**`)
		// 			.setColor(process.env.COLOR_NORMAL),
		// 	],
		// });
	},
};

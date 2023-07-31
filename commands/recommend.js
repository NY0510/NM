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

		console.log("aaaaaaaaaa");
		const recommendVideos = await youtubesearchapi.GetVideoDetails(nowPlayingYoutubeId);
		console.log(recommendVideos.suggestion);

		let videoCount = 0;
		for (video in recommendVideos) {
			console.log(video);
			await player.queue.add(player.search(`https://youtube.com/watch?v=${video.id}`, message.author).tracks, message.author);
			videoCount++;
		}

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setDescription(`${process.env.EMOJI_CHECK} **현재 재생중인 곡을 기반으로 한 추천 노래 ${videoCount}개를 추가했어요**`)
					.setColor(process.env.COLOR_NORMAL),
			],
		});
	},
};

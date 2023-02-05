require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "remove",
	aliases: ["rm", "그"],

	run: async (client, message, args) => {
		const { channel } = message.member.voice;
		const player = client.manager.get(message.guild.id);

		if (!channel) {
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **음성 채널에 먼저 접속하세요**`).setColor(process.env.COLOR_ERROR)],
			});
		}
		if (!player)
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **이 서버에서 재생중인 음악이 없어요**`).setColor(process.env.COLOR_ERROR)],
			});

		const index = Object.keys(args).length == 0 ? 0 : args - 1;
		if (0 <= index && index < player.queue.size) {
			const title = player.queue[index].title;
			player.queue.remove(index);
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_CHECK} **${title} 삭제 완료**`).setColor(process.env.COLOR_NORMAL)],
			});
		} else {
			return message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} **올바른 숫자를 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});
		}
	},
};

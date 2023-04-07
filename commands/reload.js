require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "reload",
	aliases: ["ㄱ디ㅐㅁㅇ"],

	run: async (client, message, args) => {
		const ownerID = process.env.BOT_OWNER_ID;

		if (message.author.id !== ownerID) return;
		if (!args[0])
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} 리로드 할 모듈 이름을 입력해주세요`).setColor(process.env.COLOR_ERROR)],
			});

		if (!client.commands.has(args[0]))
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`${process.env.EMOJI_X} ${args[0]} 모듈은 존재하지 않아요`).setColor(process.env.COLOR_ERROR)],
			});

		await message
			.reply({ embeds: [new EmbedBuilder().setTitle(`<a:loading:1088966142560841789> ${args[0]} 모듈 리로드 중`).setColor(process.env.COLOR_NORMAL)] })
			.then(async msg => {
				try {
					delete require.cache[require.resolve(`./${args[0]}.js`)];
					client.commands.delete(args[0]);

					client.commands.set(args[0], require(`./${args[0]}.js`));
				} catch (e) {
					msg.edit({
						embeds: [
							new EmbedBuilder()
								.setDescription(`${process.env.EMOJI_X} ${args[0]} 모듈을 리로드 하는 도중 문제가 발생했어요\n` + "```\n" + String(e.stack) + "\n```")
								.setColor(process.env.COLOR_ERROR),
						],
					});
				}
				msg.edit({ embeds: [new EmbedBuilder().setTitle(`<a:loading:1088966142560841789> ${args[0]} 모듈 리로드 완료!`).setColor(process.env.COLOR_NORMAL)] });
			});
	},
};

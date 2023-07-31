require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "m",
	aliases: ["ㅡ"],

	run: async (client, message, args) => {
		const ownerID = process.env.BOT_OWNER_ID;
		if (message.author.id !== ownerID) return;

		if (!args[1])
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`**${process.env.EMOJI_X} 모듈 이름을 입력해주세요**`).setColor(process.env.COLOR_ERROR)],
			});

		if (!client.commands.has(args[1]))
			return await message.reply({
				embeds: [new EmbedBuilder().setDescription(`**${process.env.EMOJI_X} \`${args[1]}\` 모듈은 존재하지 않아요**`).setColor(process.env.COLOR_ERROR)],
			});

		switch (args[0]) {
			case "reload": {
				return await message
					.reply({ embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 리로드 중**`).setColor(process.env.COLOR_NORMAL)] })
					.then(async msg => {
						try {
							delete require.cache[require.resolve(`./${args[1]}.js`)];
							client.commands.delete(args[1]);

							client.commands.set(args[1], require(`./${args[1]}.js`));
						} catch (e) {
							msg.edit({
								embeds: [
									new EmbedBuilder()
										.setDescription(
											`**${process.env.EMOJI_X} \`${args[1]}\` 모듈을 리로드 하는 도중 문제가 발생했어요**\n` + "```\n" + String(e.stack) + "\n```"
										)
										.setColor(process.env.COLOR_ERROR),
								],
							});
						}
						msg.edit({
							embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 리로드 완료!**`).setColor(process.env.COLOR_NORMAL)],
						});
					});
			}
			case "load": {
				return await message
					.reply({ embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 로드 중**`).setColor(process.env.COLOR_NORMAL)] })
					.then(async msg => {
						try {
							client.commands.set(args[1], require(`./${args[1]}.js`));
						} catch (e) {
							msg.edit({
								embeds: [
									new EmbedBuilder()
										.setDescription(`**${process.env.EMOJI_X} \`${args[1]}\` 모듈을 로드 하는 도중 문제가 발생했어요**\n` + "```\n" + String(e.stack) + "\n```")
										.setColor(process.env.COLOR_ERROR),
								],
							});
						}
						msg.edit({
							embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 로드 완료!**`).setColor(process.env.COLOR_NORMAL)],
						});
					});
			}
			case "unload": {
				return await message
					.reply({ embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 언로드 중**`).setColor(process.env.COLOR_NORMAL)] })
					.then(async msg => {
						try {
							delete require.cache[require.resolve(`./${args[1]}.js`)];
							client.commands.delete(args[1]);
						} catch (e) {
							msg.edit({
								embeds: [
									new EmbedBuilder()
										.setDescription(
											`**${process.env.EMOJI_X} \`${args[1]}\` 모듈을 언로드 하는 도중 문제가 발생했어요**\n` + "```\n" + String(e.stack) + "\n```"
										)
										.setColor(process.env.COLOR_ERROR),
								],
							});
						}
						msg.edit({
							embeds: [new EmbedBuilder().setTitle(`**<a:loading:926059018844254208> \`${args[1]}\` 모듈 언로드 완료!**`).setColor(process.env.COLOR_NORMAL)],
						});
					});
			}
		}
	},
};

require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "m",
	aliases: ["ㅡ"],

	run: async (client, message, args) => {
		const ownerID = process.env.BOT_OWNER_ID;
		if (message.author.id !== ownerID) return;

		if (!args[1]) {
			await message.react(process.env.EMOJI_X);
			await message.reply("모듈 이름을 입력해주세요");
			return;
		}
		if (!client.commands.has(args[1])) {
			await message.react(process.env.EMOJI_X);
			await message.reply(`${args[1]} 모듈은 존재하지 않아요`);
			return;
		}

		switch (args[0]) {
			case "reload": {
				try {
					delete require.cache[require.resolve(`./${args[1]}.js`)];
					client.commands.delete(args[1]);

					client.commands.set(args[1], require(`./${args[1]}.js`));
				} catch (e) {
					await message.react(process.env.EMOJI_X);
				}
				await message.react(process.env.EMOJI_CHECK);
				return;
			}

			case "load": {
				try {
					client.commands.set(args[1], require(`./${args[1]}.js`));
				} catch (e) {
					await message.react(process.env.EMOJI_X);
				}
				await message.react(process.env.EMOJI_CHECK);
			}

			case "unload": {
				try {
					delete require.cache[require.resolve(`./${args[1]}.js`)];
					client.commands.delete(args[1]);
				} catch (e) {
					await message.react(process.env.EMOJI_X);
				}
				await message.react(process.env.EMOJI_CHECK);
			}
		}
	},
};

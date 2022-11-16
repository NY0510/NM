require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const helpData = require("../data/help.json");

module.exports = {
	name: "help",
	aliases: ["도움말", "명령어", "ㅗ디ㅔ"],

	run: async (client, message, args) => {
		let commands = "";
		helpData.forEach((data, index) => {
			commands += `${data["cmd"]} - ${data["description"]}${index == helpData.length - 1 ? "" : "\n"}`;
		});

		const revised = commands
			.split("\n")
			.map(x => `**${process.env.BOT_PREFIX}${x.trim()}**`)
			.join("\n");

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle("🎯 도움말")
					.setColor(process.env.COLOR_NORMAL)
					.setImage("https://file.ny64.kr/img/help.png")
					.setDescription(
						revised + `\n\n:paperclip:  **[Invite link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=37080128&scope=bot)**`
					),
			],
		});
	},
};

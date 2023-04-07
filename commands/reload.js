require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "reload",
	aliases: ["ㄱ디ㅐㅁㅇ"],

	run: async (client, message, args) => {
		const ownerID = process.env.BOT_OWNER_ID;

		if (message.author.id !== ownerID) return;
		if (!args[0])
			return message.channel.send({ embeds: [new EmbedBuilder().setTitle("Error").setDescription(`Please specify a command to reload.`).setColor(process.env.COLOR_ERROR)] });

		if (!client.commands.has(args[0]))
			return message.channel.send({
				embeds: [new EmbedBuilder().setTitle("Error").setDescription(`The command \`${args[0]}\` doesn't seem to exist.`).setColor(process.env.COLOR_ERROR)],
			});

		delete require.cache[require.resolve(`./${args[0]}.js`)];
		client.commands.delete(args[0]);

		client.commands.set(args[0], require(`./${args[0]}.js`));
		message.channel.send({ embeds: [new EmbedBuilder().setTitle(`Command \`${args[0]}\` has been reloaded!`).setColor(process.env.COLOR_NORMAL)] });

		console.log(`Command \`${args[0]}\` has been reloaded.`);
	},
};

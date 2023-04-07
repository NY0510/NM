require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "reload",
	aliases: ["ㄱ디ㅐㅁㅇ"],

	run: async (client, message, args) => {
		const ownerID = process.env.BOT_OWNER_ID;

		if (message.author.id !== ownerID) return;
		if (!args[0]) return message.channel.send(new EmbedBuilder().setTitle("Error").setDescription("Please provide a command to reload."));
		if (!client.commands.has(args[0])) return message.channel.send(new EmbedBuilder().setTitle("Error").setDescription(`The command \`${args[0]}\` doesn't seem to exist.`));
		delete require.cache[require.resolve(`./${args[0]}.js`)];
		client.commands.delete(args[0]);

		client.commands.set(args[0], require(`./${args[0]}.js`));
		message.channel.send(new EmbedBuilder().setTitle("Success").setDescription(`The command \`${args[0]}\` has been reloaded.`));

		console.log(`Command \`${args[0]}\` has been reloaded.`);
	},
};

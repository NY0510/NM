require("dotenv").config();

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	let prefix = process.env.BOT_PREFIX;
	if (!message.content.startsWith(prefix)) return;
	let args = message.content.slice(prefix.length).trim().split(/ +/).filter(Boolean);
	let command = args.length > 0 ? args.shift().toLowerCase() : null;
	if (!command || command.length == 0) return;
	let cmd;

	cmd = client.commands.get(command);
	if (!cmd) cmd = client.commands.find(cmd => cmd?.aliases?.includes(command));

	if (cmd) {
		try {
			cmd.run(client, message, args);
		} catch (e) {
			console.log(`[ERROR]`.red, `MESSAGE EVENT ERROR`.white, `\n${String(e.stack)}`);
		}
	}
};

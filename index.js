require("dotenv").config();
require("colors");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
});

// Lavalink 메니저
require("./lavalink/manager")(client);

client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

// 이벤트 핸들러
fs.readdirSync("./events")
	.filter(file => file.endsWith(".js"))
	.forEach(async eventFile => {
		let file = require(`./events/${eventFile}`);
		let fileName = eventFile.replace(".js", "");
		try {
			client.on(fileName, file.bind(null, client));

			console.log(`✔`.green, `Loaded event ${fileName.bold}`.white);
		} catch (e) {
			console.log(`✖`.red, `Failed to load command ${fileName.bold}`.white, `\n${String(e.stack)}`);
		}
	});

// 커맨드 핸들러
fs.readdirSync("./commands")
	.filter(file => file.endsWith(".js"))
	.forEach(async commandFile => {
		let file = require(`./commands/${commandFile}`);
		try {
			client.commands.set(file.name, file);
			console.log(`✔`.green, `Loaded command ${file.name.bold}`.white);
		} catch (e) {
			console.log(`✖`.red, `Failed to load command ${file.name.bold}`.white, `\n${String(e.stack)}`);
		}
	});

client.login(process.env.BOT_TOKEN).catch(e => {
	console.log(`[Error]`.red, "Invalid or No Bot Token Provided.".white);
});

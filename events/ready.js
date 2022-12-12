const { ActivityType } = require("discord.js");

module.exports = async client => {
	let userCount = 0;

	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			userCount++;
		});
	});

	client.user.setPresence({
		activities: [{ name: process.env.BOT_PRESENCE_NAME, type: ActivityType.Playing }],
		status: process.env.BOT_PRESENCE_STATUS,
	});

	client.manager.init(client.user.id);

	console.log("\n");
	console.log(`Logged in as ${client.user.tag.yellow.bold} ${`(${client.user.id})`.gray}`);
	console.log(`In ${client.guilds.cache.size} guilds, ${userCount} users\n`);
};

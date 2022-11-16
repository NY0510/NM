const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	aliases: ["핑", "ㅔㅑㅜㅎ"],

	run: async (client, message, args) => {
		const startTime = Date.now();
		const e = new EmbedBuilder().setDescription("**지연시간 측정중...**").setColor(0x212326);

		await message.reply({ embeds: [e] }).then(async msg => {
			const botLatency = Date.now() - startTime;
			const apiLatency = Math.round(client.ws.ping);
			const description = `⏱️ **\`봇 지연시간: ${botLatency}ms\`**\n⌛ **\`API 지연시간: ${apiLatency}ms\`**`;
			const e = new EmbedBuilder().setTitle("🏓 핑-퐁!").setDescription(description).setColor(process.env.COLOR_NORMAL).setTimestamp();

			await msg.edit({ embeds: [e] });
		});
	},
};

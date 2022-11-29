const { Manager } = require("erela.js");
const { EmbedBuilder } = require("discord.js");
const Filter = require("erela.js-filters");
const Spotify = require("better-erela.js-spotify").default;
const wait = require("timers/promises").setTimeout;

module.exports = client => {
	try {
		client.manager = new Manager({
			nodes: [
				{
					host: process.env.LAVALINK_HOST,
					port: parseInt(process.env.LAVALINK_PORT),
					password: process.env.LAVALINK_PASSWORD,
				},
			],
			send(id, payload) {
				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			},
			plugins: [new Filter(), new Spotify()],
		})
			.on("nodeConnect", node => console.log(`✔`.green, `Connected to Lavalink node ${node.options.identifier}`.white))
			.on("nodeError", (node, error) => console.log(`✖`.red, `Lavalink node ${node.options.identifier} encountered an error: ${error.message}`.white))
			.on("trackStart", (player, track) => {
				const bindChannel = client.channels.cache.get(player.textChannel);
				const logChannel = client.channels.cache.get(process.env.MUSIC_LOG_CHANNEL_ID);

				bindChannel.send({ embeds: [new EmbedBuilder().setDescription(`🎵 ** ${track.title}**`).setColor(process.env.COLOR_NORMAL)] });
				console.log(
					`[Music] ${track.title} is playing in ${bindChannel.guild.name} (${bindChannel.guild.id}) by ${track.requester.username}#${track.requester.discriminator} (${track.requester.id})`
				);
				logChannel.send({
					embeds: [
						new EmbedBuilder()
							.setDescription(
								`[${track.title.replaceAll("[", "［").replaceAll("]", "］")}](${track.uri}) is playing in **${bindChannel.guild.name}** (${
									bindChannel.guild.id
								}) by **${track.requester.username}#${track.requester.discriminator}** (${track.requester.id})`
							)
							.setThumbnail(track.thumbnail),
					],
				});
			})
			.on("queueEnd", player => {
				client.channels.cache
					.get(player.textChannel)
					.send({ embeds: [new EmbedBuilder().setDescription("🎵 **대기열에 있는 음악을 모두 재생했어요**").setColor(process.env.COLOR_NORMAL)] });
				wait(2000);
				player.destroy();
			});

		client.on("raw", d => client.manager.updateVoiceState(d));
		console.log(`✔`.green, `Loaded Lavalink Manager`);
	} catch (e) {
		console.log(`✖`.red, `Failed to load Lavalink Manager`.white, `\n${String(e.stack)}`);
	}
};

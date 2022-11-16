require("dotenv").config();
const { EmbedBuilder } = require("discord.js");

module.exports = (client, guild) => {
	const owner = client.users.cache.get(guild.ownerId);

	client.channels.cache.get(process.env.JOIN_LOG_CHANNEL_ID).send({
		embeds: [
			new EmbedBuilder()
				.setTitle(`${process.env.EMOJI_CHECK} 서버에 초대받았어요!`)
				.addFields(
					{
						name: "이름",
						value: "```" + guild.name + "```",
						inline: true,
					},
					{
						name: "인원",
						value: "```" + guild.memberCount + "명```",
						inline: true,
					},
					{
						name: "역할",
						value: "```" + guild.roles.cache.size + "개```",
						inline: true,
					},
					{
						name: "관리자",
						value: "```" + `${owner?.tag} (${owner?.id})` + "```",
						inline: true,
					},
					{
						name: "현재 서버",
						value: "```" + client.guilds.cache.size + "개```",
						inline: true,
					}
				)
				.setThumbnail(guild.iconURL())
				.setColor(process.env.COLOR_NORMAL)
				.setTimestamp(),
		],
	});
};

const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		let user;

		try {
			if (message.mentions.users.size > 0) {
				user = message.mentions.users.first();
			} else if (args[0]) {
				const userID = args[0].replace(/[^0-9]/g, "");
				if (!userID) {
					user = message.author;
				} else {
					user = await client.users.fetch(userID);
				}
			} else {
				user = message.author;
			}

			const avatarURL = user.displayAvatarURL({ extension: "png", size: 512 });
			let animatedGif = await petPetGif(avatarURL, { resolution: 256 });
			await message.reply({ files: [{ attachment: animatedGif, name: "pet.gif" }] });
		} catch (error) {
			return await message.reply("`ERROR` " + error.message);
		}
	},
};

const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		let user = message.mentions.users.first() || message.author;

		// Get the user's avatar URL
		const avatarURL = user.avatarURL({ format: "png", size: 512 });

		// Generate the petpet gif and send it in the message
		try {
			let animatedGif = await petPetGif(avatarURL);
			await message.reply({ files: [{ attachment: animatedGif, name: "pet.gif" }] });
		} catch (error) {
			return message.reply("`ERROR`" + error.message);
		}
	},
};

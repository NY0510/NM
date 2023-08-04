const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		let user = message.mentions.users.first() || message.author;

		const avatarURL = user.avatarURL({ extension: "png", size: 512 });

		try {
			let animatedGif = await petPetGif(avatarURL);
			await message.reply({ files: [{ attachment: animatedGif, name: "pet.gif" }] });
		} catch (error) {
			return await message.reply("`ERROR` " + error.message);
		}
	},
};

require("dotenv").config();
const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		let animatedGif = await petPetGif(message.author.avatarURL({ extension: "png", size: 512 }));
		await message.reply({ files: [{ file: animatedGif, name: "pet.gif" }] });
	},
};

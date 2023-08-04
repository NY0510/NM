require("dotenv").config();
const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		let animatedGif = await petPetGif(message.author.avatarURL({ extension: "png", size: 256 }));
		await message.reply("a");
		console.log(animatedGif);
	},
};

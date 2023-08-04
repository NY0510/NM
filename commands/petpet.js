require("dotenv").config();
const petPetGif = require("pet-pet-gif");

module.exports = {
	name: "petpet",
	aliases: ["pet", "쓰담", "ㅔㄷ섿ㅅ", "ㅔㄷㅅ"],

	run: async (client, message, args) => {
		await message.reply("a");
		let animatedGif = await petPetGif(message.author.avatarURL);
		console.log(animatedGif);
	},
};

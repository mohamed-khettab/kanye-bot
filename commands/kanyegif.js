const axios = require("axios");
const { giphy_token } = require("../config.json");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const fetchGifs = async () => {
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: giphy_token,
      q: "Kanye West",
      limit: 100,
    },
  });

  const gifs = response.data.data;
  const gifUrls = gifs.map((gif) => gif.images.original.url);

  return gifUrls;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyegif")
    .setDescription("Get a random Kanye gif!"),
  async execute(interaction) {
    try {
      // defer reply first
      // reference https://stackoverflow.com/a/68774492
      await interaction.deferReply();

      const gifs = await fetchGifs();

      const gif = gifs[Math.floor(Math.random() * gifs.length)];

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: "Kanye West",
          iconURL:
            "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
        })
        .setImage(gif)
        .setTimestamp();
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error executing command:", error);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const quotes = require("../data/quotes.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Get a random Kanye quote!"),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Random Kanye Quote")
      .setAuthor({
        name: "Kanye West",
        iconURL: "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
      })
      .setDescription(quotes[Math.floor(Math.random() * quotes.length)])
      .setTimestamp()

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};

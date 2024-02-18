const { SlashCommandBuilder } = require("discord.js");
const quotes = require("../../data/quotes.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Get a random Kanye quote!"),
  async execute(interaction) {
    await interaction.reply(quotes[Math.floor(Math.random() * quotes.length)]);
  },
};

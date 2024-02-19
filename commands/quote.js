const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require('axios');

const fetchQuote = async () => {
  try {
    const response = await axios.get('https://api.kanye.rest');
    console.log(response.data); 
    return response.data.quote;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyequote")
    .setDescription("Get a random Kanye quote!"),
  async execute(interaction) {
    try {
      // defer reply first
      // reference https://stackoverflow.com/a/68774492
      await interaction.deferReply();

      const quote = await fetchQuote();
      console.log(quote);
      
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Random Kanye Quote")
        .setAuthor({
          name: "Kanye West",
          iconURL: "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
        })
        .setDescription(`"${quote}"`) 
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

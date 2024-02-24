const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyehelp")
    .setDescription("Display available commands"),
  async execute(interaction) {
    try {
      // Defer reply first
      await interaction.deferReply();

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: "Kanye Bot",
          iconURL:
            "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
        })
        .setTitle("Bot Commands")
        .setDescription("List of available commands:")
        .addField("kanyegif", "Get a gif of Kanye West.")
        .addField("kanyequote", "Get a Kanye West quote.")
        .addField("kanyelyrics", "Get the lyrics of any Kanye song.")
        .addField("kanyelove", "Get loved by Kanye.")
        .addField("kanyehate", "Get hated by Kanye")
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

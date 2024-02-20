const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const insults = require("../data/insults.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyehate")
    .setDescription("Be hated by Kanye!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to whom Kanye will express hatred")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const user = interaction.options.getUser("user") || interaction.user;
      const insult = insults[Math.floor(Math.random() * insults.length)];
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: "Kanye West",
          iconURL:
            "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
        })
        .setDescription(`<@${user.id}>${insult}`)
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

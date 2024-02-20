const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const compliments = require("../data/compliments.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyelove")
    .setDescription("Get loved by Kanye!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to whom Kanye will express love")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const user = interaction.options.getUser("user") || interaction.user;
      const compliment =
        compliments[Math.floor(Math.random() * compliments.length)];
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: "Kanye West",
          iconURL:
            "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png",
        })
        .setDescription(`<@${user.id}>${compliment}`)
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

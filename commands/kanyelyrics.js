const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Genius = require("genius-lyrics");
const { genius_token } = require("../config.json");

const Client = new Genius.Client(genius_token);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanyelyrics")
    .setDescription("Get lyrics to a Kanye song/song related to Kanye!")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The name of the song")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
        // defer the reply first before sending to prevent unknown interaction error
        // reference https://stackoverflow.com/a/68774492
        await interaction.deferReply();

      const songTitle = interaction.options.getString("song");
      const artistName = "Kanye West";

      const searches = await Client.songs.search(`${songTitle} ${artistName}`);
      if (searches.length > 0) {
        const firstSong = searches[0];
        const lyrics = await firstSong.lyrics();

        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`Lyrics for ${firstSong.fullTitle}`)
          .setURL(`${firstSong.url}`)
          .setAuthor({ name: "Kanye Bot", iconURL: "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png" })
          .setDescription(lyrics.length > 4090 ? lyrics.substring(0, 4090) + "..." : lyrics)
          .setImage(`${firstSong.image}`)
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] }).catch(error => {
          console.error("Error editing reply to interaction:", error);
        });
      } else {
        console.log("Song not found.");
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`Lyrics for ${interaction.options.getString("song")}`)
          .setAuthor({ name: "Kanye West", iconURL: "https://media.tenor.com/N_sak3Z8TVYAAAAe/kanye-west-selfie.png" })
          .setDescription("Sorry! The requested song was not found.")
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] }).catch(error => {
          console.error("Error editing reply to interaction:", error);
        });
      }
    } catch (error) {
      console.error("Error executing command:", error);
      await interaction.reply(
        "An error occurred while processing the command."
      );
    }
  },
};

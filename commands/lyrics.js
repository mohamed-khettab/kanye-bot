const { SlashCommandBuilder } = require("discord.js");
const Genius = require("genius-lyrics");
const { genius_token } = require("../config.json");

const Client = new Genius.Client(genius_token);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kanyelyrics")
        .setDescription("Get lyrics to a Kanye song!")
        .addStringOption((option) =>
            option
                .setName("song")
                .setDescription("The name of the song")
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            // Search for the song
            const songTitle = interaction.options.getString('song');
            const artistName = "Kanye West";
            
            const searches = await Client.songs.search(`${songTitle} ${artistName}`);
            if (searches.length > 0) {
                const firstSong = searches[0];
                const lyrics = await firstSong.lyrics();
                console.log("Lyrics of the Song:\n", lyrics, "\n");
                await interaction.reply("Song lyrics found")
            } else {
                console.log("Song not found.");
                await interaction.reply("Song not found.");
            }
        } catch (error) {
            console.error('Error executing command:', error);
            console.error('Error stack:', error.stack); // Log the stack trace
            await interaction.reply("An error occurred while processing the command.");
        }
    },
};

const { SlashCommandBuilder } = require("discord.js");
const {
  getVoiceConnection,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("discord-ytdl-core");
const songs = require("../data/songs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a Kanye song!")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The name or URL of the song to play")
        .setRequired(true)
    ),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      await interaction.reply(
        "You must be in a voice channel to use this command!"
      );
      return;
    }

    const permissions = channel.permissionsFor(interaction.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      await interaction.reply(
        "I need permission to join and speak in your voice channel!"
      );
      return;
    }

    try {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSongUrl = songs[randomIndex];
      console.log("Random song URL:", randomSongUrl);

      let connection = getVoiceConnection(channel.guild.id);
      if (!connection) {
        console.log(
          "No existing connection found. Attempting to join voice channel..."
        );
        connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      } else {
        console.log("Existing connection found. Reusing connection...");
      }

      console.log("Connection:", connection);
      const stream = ytdl(randomSongUrl, {
        filter: "audioonly",
        opusEncoded: true, // opus encoded
        encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
      });
      console.log("Stream created:", stream);

      stream.on("data", (chunk) => {
        console.log("Received stream data:", chunk);
      });

      stream.on("error", (error) => {
        console.error("Stream error:", error);
      });

      const player = createAudioPlayer();
      console.log("Audio player created: ", player);

      const resource = createAudioResource(stream, {
        inputType: StreamType.Opus, // opus
        silencePaddingFrames: 0, // Remove or set to 0
      });
      console.log("Audio resource created: ", resource);

      console.log("Playback duration:", resource.playbackDuration);
      console.log("Volume:", resource.volume);

      connection.subscribe(player);
      console.log("Player subscribed to connection");

      player.play(resource);
      console.log("Playback started");

      player.on("stateChange", (state) => {
        console.log(`Audio player state changed to ${state.status}`);
      });

      player.on("error", (error) => {
        console.error("Audio player error:", error);
      });

      player.on("debug", (message) => {
        console.log("Audio player debug:", message);
      });

      player.once("start", () => {
        console.log("Audio player started playing");
        console.log("Player state:", player.state);
      });

      await interaction.reply(`Now playing: ${randomSongUrl}`);
    } catch (error) {
      console.error("Error:", error);
      await interaction.reply(
        "An error occurred while processing your request. Idiot"
      );
    }
  },
};

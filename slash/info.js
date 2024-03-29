const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Displays info on the current bot"),

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) return await interaction.editReply("There are no songs in the queue")

    const currentSong = queue.current

    let bar = queue.createProgressBar({
      queue: false,
      length: 19
    })
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
        .setThumbnail(currentSong.thumbnail)
        .setDescription(`Currently Playing [${currentSong.title}](${currentSong.url})\n\n` + bar)],
    })
  }
}
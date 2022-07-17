const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Displays info on the current bot")
    .addNumberOption((option) => option.setName("seek_amount").setDescription("Seek to a specific timestamp of a song").setRequired(true)),

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    const seek_amount = (interaction.options.getNumber("seek_amount")) * 1000

    if (!queue) return await interaction.editReply("There are no songs in the queue")
    if (seek_amount > queue.current.length) return await interaction.editReply(`There is only ${queue.current.length} in this song!`)

    const currentSong = queue.current
    queue.seek(seek_amount)

    let bar = queue.createProgressBar({
      queue: false,
      length: 19
    })
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
        .setThumbnail(currentSong.thumbnail)
        .setDescription(`Skipped to: [${currentSong.title}](${currentSong.url})\n\n` + bar)]
    })
  }
}
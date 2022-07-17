const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue_erase")
    .setDescription("Erase a song from the queue")
    .addNumberOption((option =>
        option.setName("tracknumber").setDescription("The track to erase").setMinValue(1).setRequired(true))),

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) return await interaction.editReply("There are no songs in the queue")

    const trackNum = interaction.options.getNumber("tracknumber")
    if (trackNum > queue.tracks.length) return await interaction.editReply("Invalid track number")
    queue.remove(trackNum - 1)
    await interaction.editReply(`Skipped to ${trackNum}!`)
  }
}
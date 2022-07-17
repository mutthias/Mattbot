const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Stops the bot and clears queue"),

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) return await interaction.editReply("There are no songs in the queue")

    queue.destroy(0)
    await interaction.editReply("Queue wiped :speak_no_evil:")
  }
}
const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loops the current song"),

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) return await interaction.editReply("There are no songs in the queue")

    queue.setRepeatMode(1);
    await interaction.editReply("The current song is now looped!")
    
  },
}
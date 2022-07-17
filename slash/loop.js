const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
  .setName("loop")
  .setDescription("Loops the current song # times")
  .addNumberOption((option) => option.setName("loop_num").setDescription("A number between 0-2").setMinValue(0).setMaxValue(2))
  // .addSubcommand((subcommand) => 
  //   subcommand
  //     .setName("cancel")
  //     .setDescription("Cancel the loop")
  //     .addStringOption((option) => option.setName("cancel").setDescription("Cancel the loop").setRequired(true))
  //   )
    ,

  run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guildId)
    if (!queue || !queue.playing) return await interaction.editReply("There are no songs in the queue!")

    const loop_num = (interaction.options.getNumber("loop_num") || 1)
    queue.setRepeatMode(loop_num);
    if (loop_num === 0) return await interaction.editReply(`The current song will no longer be looped.`)
    if (loop_num === 1) return await interaction.editReply(`The current song will now be looped.`)
    if (loop_num === 2) return await interaction.editReply(`The current queue will now be looped.`)
    
    
  }
}
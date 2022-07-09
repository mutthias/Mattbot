const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "embed",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    const embed = new MessageEmbed()
    .setColor('AQUA')
    .setTitle('Embed title :see_no_evil:')
    .setDescription('This is a test description')
    .setThumbnail('https://i.ytimg.com/vi/Dbo7S0pafO0/hqdefault.jpg')
    .setImage('https://memegenerator.net/img/images/300x300/73335330/bbl-drake.jpg')
    .setTimestamp()
    .setFooter(`Embed created by ${message.author.tag}`)
  
    message.channel.send({embeds: [embed]})
    message.channel.send(`balls`)
  }
}
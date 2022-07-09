const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "purge",
  category: "moderation",
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have permission for this command!")

    const amount = parseInt(args[0])

    if (!amount) return message.channel.send("Please specify how many messages you want to delete.")
    if (isNaN(amount)) return message.channel.send("That isn't a number.")
    if (amount > 100 || amount < 1) return message.channel.send("Please select a number between 1 and 100.")
    
      message.channel.bulkDelete(amount)
      .catch(err => {
        message.channel.send("I can't delete messages older than 14 days.")
      })
      const embed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`:see_no_evil: Deleted ${amount} message(s)!`)
      message.channel.send({embeds: [embed]})
  }
}
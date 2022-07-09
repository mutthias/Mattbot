module.exports = {
  name: "membercount",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
    message.channel.send(`**Server Members: ** ${message.guild.memberCount - 1}`)
  }
}
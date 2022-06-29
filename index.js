const {Client, Intents, Message} = require('discord.js');
require("dotenv").config();

const generateImage = require("./generateimage.js");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.id === client.user.id) return;

  if (message.content === "ping") {
    message.reply("boy shutcho squiggly diggly ass up twerk");
  }
});

const welcomeChannelID = "991602566066602056";

client.on('guildMemberAdd', async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelID).send({
    content:`<@${member.id}> Welcome to da server`,
    files: [img]
  })
})

client.login(process.env.TOKEN);

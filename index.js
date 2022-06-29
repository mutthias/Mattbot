const {Client, Intents, Message} = require('discord.js');
const {token} = require('./config.json');

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

client.login(token);

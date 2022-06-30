const Discord = require('discord.js');
require("dotenv").config();

const generateImage = require("./generateimage.js");

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
});

let bot = {
  client,
  prefix: "n.",
  owners: ["582376952980045842"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;

// client.once('ready', () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });

// client.on('message', (message) => {
//   if (message.author.id === client.user.id) return;

//   if (message.content === "ping") {
//     message.reply("boy shutcho squiggly diggly ass up twerk");
//   }
// });

// const welcomeChannelID = "991602566066602056";

// client.on('guildMemberAdd', async (member) => {
//   const img = await generateImage(member);
//   member.guild.channels.cache.get(welcomeChannelID).send({
//     content:`<@${member.id}> Welcome to da server`,
//     files: [img]
//   })
// })

client.login(process.env.TOKEN);

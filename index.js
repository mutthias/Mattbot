const Discord = require('discord.js');
const {MessageEmbed} = require("discord.js");
require("dotenv").config();
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9')
const {Player} = require("discord-player");
const fs = require("fs");

const LOAD_SLASH = process.argv[2] == "load";

const CLIENT_ID = "989323695782768681";
const GUILD_ID = "767939191962599475";

const generateImage = require("./generateimage.js");

const client = new Discord.Client({
  allowedMentions: {
    parse: [`users`, `roles`],
    repliedUser: true,
  },

  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_VOICE_STATES"
  ]
});

client.slashcommands = new Discord.Collection();
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  }
})

let commands = []
const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`)
  client.slashcommands.set(slashcmd.data.name, slashcmd)
  if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
  const rest = new REST({version: "9"}).setToken(process.env.TOKEN)
  console.log("Deploying slash commands!")
  rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
  .then(() => {
    console.log("Succesfully loaded")
    process.exit(0);
  })
  .catch((err) => {
    if (err) {
      console.log(err)
      process.exit(1);
    }
  })
}
else {
  client.on("ready", () => {
    console.log(`im logged in as ${client.user.tag}`)
  })
  client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
      if (!interaction.isCommand()) return;
      const slashcmd = client.slashcommands.get(interaction.commandName)
      if (!slashcmd) interaction.reply("Not a valid slash command")

      await interaction.deferReply();
      await slashcmd.run({client, interaction});
    }
    handleCommand()
  })
}

let bot = {
  client,
  prefix: "-",
  owners: ["582376952980045842"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot

client.login(process.env.TOKEN);






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

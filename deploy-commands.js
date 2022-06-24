const {Command_Builder} = require('@discordjs/builders');
const {Rest} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientID, guildID, token} = require('./config.json')

const commands = [
  new Command_Builder().setName('tictactoe').setDescription('Play a game of tic-tac-toe'),
]

const rest = new Rest({version: '9'}).setToken(token);

rest.put(Routes.applicationCommands(clientID, guildID), {body: commands.map(command => command.toJSON())})
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

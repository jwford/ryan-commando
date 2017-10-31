const Commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const ryanbot = new Commando.Client({
  selfbot: config.selfbot,
  commandPrefix: config.commandPrefix,
  commandEditableDuration: config.commandEditableDuration,
  nonCommandEditable: config.nonCommandEditable,
  disableEveryone: config.disableEveryone,
  unknownCommandResponse: config.unknownCommandResponse,
  owner: config.ownerID
});

require('./util/eventLoader')(ryanbot);

ryanbot.registry
    .registerGroups([
        ['hogwartaria', 'Hogwartaria Only Commands'],
        ['useful', 'Useful Commands'],
        ['owners', 'Bot Owner Commands'],
        ['tuataria', 'Tuataria Only Commands'],
        ['util', 'Utility Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultTypes()
    .registerDefaultCommands({
      ping: false,
      eval_: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

ryanbot.login(config.token);

process.on('unhandledRejection', console.error);
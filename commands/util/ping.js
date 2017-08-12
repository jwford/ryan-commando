const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      group: 'util',
      memberName: 'ping',
      description: 'Checks the ping.'
    });
  }

  run(msg) {
    msg.channel.send('Oh hallo there...')
    .then(message => {
      message.edit(`${msg.member.displayName}, your ping is ${message.createdTimestamp - msg.createdTimestamp}ms. Anything else you need?`);
    });
  }
};
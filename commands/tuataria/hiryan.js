const { Command } = require('discord.js-commando');
const responses = require('../../data.json').ryan_responses;

module.exports = class HiRyanCommnd extends Command {
  constructor(client) {
    super(client, {
      name: 'hiryan',
      group: 'tuataria',
      memberName: 'hiryan',
      description: 'Supsteve, but for Ryan.',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10
      },
    });
  }

  run(msg) {
    msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
  }
};
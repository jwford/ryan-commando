const { Command } = require('discord.js-commando');
const responses = require('../../data.json');

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
    let num = Math.floor(Math.random() * responses.length);
    let answer = responses[num];
    msg.channel.send(answer);
  }
};
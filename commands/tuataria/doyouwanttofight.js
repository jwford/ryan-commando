const { Command } = require('discord.js-commando');

module.exports = class DoYouWantToFightCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'doyouwanttofight',
      group: 'tuataria',
      memberName: 'doyouwanttofight',
      description: 'self explanatory'
    });
  }

  run(msg) {
    msg.channel.send('YES. I MUST BE THE ONLY RYAN.');
  }
};
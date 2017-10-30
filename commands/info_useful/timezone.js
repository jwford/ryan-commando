const { Command } = require('discord.js-commando');

module.exports = class TimezoneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'timezone',
      aliases: ['time'],
      group: 'useful',
      memberName: 'timezone',
      description: 'Converts timezones.',
    });
  }

  run(msg) {
    msg.channel.send('<https://www.youtube.com/watch?v=-5wpm-gesOY>\n<https://www.timeanddate.com/worldclock/converter.html>');
  }
};

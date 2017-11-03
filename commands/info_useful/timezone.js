const { Command } = require('discord.js-commando');

module.exports = class TimezoneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'timezone',
      aliases: ['time'],
      group: 'useful',
      memberName: 'timezone',
      description: 'Gives links related to timezones.',
      details: 'This command gives a link to a Tom Scott video explaining why Ryan doesn\'t have an actual timezone converter, and a link to a good timezone converter on the web.'
    });
  }

  run(msg) {
    msg.channel.send('<https://www.youtube.com/watch?v=-5wpm-gesOY>\n<https://www.timeanddate.com/worldclock/converter.html>');
  }
};

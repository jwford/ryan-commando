const { Command } = require('discord.js-commando');
const answers = require('../../data.json').hipeevesresponses;

module.exports = class HiPeevesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hipeeves',
      group: 'hogwartaria',
      memberName: 'hipeeves',
      description: 'Hogwartaria equivalent of supsteve.',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.guild.id !== '311165518080114688') return msg.delete();

    var random = Math.floor(Math.random() * answers.length);
    msg.channel.send(answers[random]);
  }
};

const { Command } = require('discord.js-commando');

module.exports = class ShirtCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'whatareyoudoingryan',
      aliases: ['whatareyoudoing', 'whatsupryan', 'supryan'],
      group: 'tuataria',
      memberName: 'whatareyoudoingryan',
      description: 'See Ryan cry about being worse than Kyle.',
      guildOnly: true
    });
  }

  run(msg) {
    var responses = [
    "Wishing I was as cool as Kyle", 
    "*wakes up* ..wha? KYLE WAS HERE? IS HE HERE NOW?! Oh ok back to sleep.",
    "One day, Some day, I will beeeeeee as cool as Kyle.",
]
    if (msg.guild.name !== 'Tuataria') return msg.delete();
    var random = Math.floor(Math.random() * responses.length);
    msg.channel.send(responses[random]);
  }
};

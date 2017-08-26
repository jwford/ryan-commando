const { Command } = require('discord.js-commando');
// const answers = require('../../data.json').hipeevesresponses;

module.exports = class HiArnold extends Command {
  constructor(client) {
    super(client, {
      name: 'hiarnold',
      group: 'hogwartaria',
      memberName: 'hiarnold',
      description: 'Hogwartaria equivalent of hiryan.',
      guildOnly: true
    });
  }

  run(msg) {
    // if (msg.guild.id !== '311165518080114688') return msg.delete();
    //
    // var random = Math.floor(Math.random() * answers.length);
    // msg.channel.send(answers[random]);
    msg.channel.send('Come up with things for me to say first!');
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'useful',
      memberName: 'roll',
      description: 'Rolls a die.',
      format: '[number of sides]',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [{
        key: 'sides',
        label: 'number of sides',
        type: 'string',
        prompt: 'Enter the number of sides the die should have.',
        default: '6'}]
    });
  }

  run(msg, args) {
    if (msg.guild.id !== '273689397675687940' && msg.guild.id !== '318756188135227402') return msg.delete(); //tuataria and gamataria

    if (args.sides === 'out') return msg.channel.send(new RichEmbed()
    .setColor(0x2913ef)
    .setTitle('Autobots, transform and roll out!'));

    if (isNaN(args.sides)) return msg.reply('yeah, let\'s use numbers, please.');
    let sides = parseFloat(args.sides);

    if (!this.client.isOwner(msg.author)) {
      if (sides < 2 || sides > 1000 || sides % 1 !== 0) return msg.reply('come on now, please enter a valid integer between 2 and 1,000.');
    }

    let roll = Math.floor(Math.random() * sides) + 1;

    msg.channel.send(new RichEmbed()
    .setColor(0x2913ef)
    .setTitle(`${msg.member.displayName}, you rolled a ${roll} :game_die:`));
  }
};

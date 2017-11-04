const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'useful',
      memberName: 'roll',
      description: 'Rolls a die.',
      details: 'You can only use this command once every 10 seconds. You must enter an *integer* that is between 2 and 1000, inclusive. If you don\'t provide a number, the command will default to 6.',
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [{
        key: 'sides',
        label: 'number of sides',
        type: 'integer',
        prompt: 'Enter the number of sides the die should have.',
        default: '6',
        validate: sides => {
          if (sides < 2 || sides > 1000 || sides % 1 !== 0) return 'come on now, please enter a valid integer between 2 and 1,000.';
          return true;
        }}]
    });
  }

  run(msg, args) {
    msg.channel.send(new RichEmbed()
    .setColor(0x2913ef)
    .setTitle(`${msg.member.displayName}, you rolled a ${Math.floor(Math.random() * args.sides) + 1} :game_die:`));
  }
};

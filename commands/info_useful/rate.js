const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rate',
      group: 'useful',
      memberName: 'rate',
      description: 'Rates whatever is specified.',
      details: 'Give Ryan a thing to rate! Must be 50 characters or less.',
      examples: ['`r;rate my hopes and dreams`', '`r;rate steve`'],
      args: [{
        key: 'thing',
        prompt: 'What do you want Ryan to rate?',
        type: 'string',
        validate: thing => {
          if (thing.length > 50) return 'Ryan will only rate things that are less than 50 characters.';
          return true;
        }
      }]
    });
  }

  run(msg, args) {
    msg.channel.send(new RichEmbed()
    .setColor(0x42f4cb)
    .setTitle(`Ryan gives ${args.thing} a ${Math.floor(Math.random() * 10) + 1} out of 10!`));
  }
};
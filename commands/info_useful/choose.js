const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class ChooseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'choose',
      group: 'useful',
      memberName: 'choose',
      description: 'Makes choices for you.',
      details: 'This command takes a list of choices from you and tells you which one you should pick. Choices should be separated by `/`.',
      examples: ['`r;choose steve/ryan`, `r;choose food/sleep/discord/homework`'],
      args: [{
        key: 'choices',
        prompt: 'What choices do you want to give to Ryan?',
        type: 'string',
        validate: choices => {
          if (choices.split('/').length < 2) return 'it\'s a little too easy to make a choice with only one option.';
          return true;
        }
      }]
    });
  }

  run(msg, args) {
    let choices = args.choices.split('/');

    msg.channel.send(new RichEmbed()
    .setColor(0xffbb00)
    .addField('Ryan chooses...', `${choices[Math.floor(Math.random() * choices.length) + 1]}!!`));
  }
};
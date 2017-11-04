const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SortMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sortme',
      group: 'hogwartaria',
      memberName: 'sortme',
      description: 'Links the sorting quizzes for Hogwarts, Ilvermorny, and Tuataria.',
      details: 'In case you want to know which house to sort yourself into, but aren\'t sure, use this command to access links to the quizzes!',
      examples: ['`r;sortme hogwarts`', '`r;sortme ilvermorny`', '`r;sortme tuataria`'],
      guildOnly: true,
      args: [{
        key: 'quiz',
        prompt: 'Which sorting quiz would you like the link to?',
        type: 'string',
        validate: quiz => {
          quiz = quiz.toLowerCase();
          if (quiz !== 'hogwarts' && quiz !== 'ilvermorny' && quiz !== 'tuataria') return 'that\'s not a valid quiz. Fix your typo smh';
          return true;
        }
      }]
    });
  }

  run(msg, args) {
    if (msg.guild.id !== '311165518080114688') return msg.delete();
    let quiz = args.quiz.toLowerCase();

    if (quiz === 'hogwarts') {
      msg.channel.send(new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Hogwarts, ${msg.member.displayName}`, '<https://my.pottermore.com/sorting-hat>', true));
    } else if (quiz === 'ilvermorny') {
      msg.channel.send(new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Ilvermorny, ${msg.member.displayName}`, '<https://my.pottermore.com/ilvermorny-sorting>', true));
    } else if (quiz === 'tuataria') {
      msg.channel.send(new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Tuataria, ${msg.member.displayName}`, '<http://www.quibblo.com/quiz/klYoV-h/TUATARIA-SORTING-HAT-QUIZ>', true));
    }
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SortMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sortme',
      group: 'hogwartaria',
      memberName: 'sortme',
      description: 'Links the sorting quizzes for Hogwarts, Ilvermorny, and Tuataria.',
      guildOnly: true,
      args: [{
        key: 'quiz',
        prompt: 'Which sorting quiz would you like the link to?',
        type: 'string'
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

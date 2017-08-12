const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SortMeCommand extends Command {
  constructor(stevebot) {
    super(stevebot, {
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
    var member = msg.member;
    var quiz = args.quiz.toLowerCase();

    if (quiz === 'hogwarts') {
      const embed = new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Hogwarts, ${member.displayName}`, '<https://my.pottermore.com/sorting-hat>', true);
      msg.channel.send({embed});
    } else if (quiz === 'ilvermorny') {
      const embed = new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Ilvermorny, ${member.displayName}`, '<https://my.pottermore.com/ilvermorny-sorting>', true);
      msg.channel.send({embed});
    } else if (quiz === 'tuataria') {
      const embed = new RichEmbed()
      .setColor(0x276df9)
      .addField(`Here's the Sorting Quiz for Tuataria, ${member.displayName}`, '<http://www.quibblo.com/quiz/klYoV-h/TUATARIA-SORTING-HAT-QUIZ>', true);
      msg.channel.send({embed});
    }
  }
};

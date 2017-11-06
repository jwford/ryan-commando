const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const numconverter = require('number-to-words');

module.exports = class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'useful',
      memberName: 'poll',
      description: 'Useful command for polls.',
      details: 'Use this command for polls! You can have a maximum of 5 options. The question you are asking *must* be surrounded by quotes, and each answer should be separated by `/`.',
      examples: ['`r;poll "What is the best ship name of Ench and Erin?" fuck the steelers/erithan/fuckhead twins`'],
      guildOnly: true,
      args: [
        {
          key: 'question',
          prompt: 'What question would you like to ask?',
          type: 'string',
          validate: question => {
            if (question.length > 256) return 'questions have a maximum length of 1024 characters.';
            return true;
          }
        },
        {
          key: 'answers',
          prompt: 'Which options for answers would you like to provide?',
          type: 'string',
          validate: answers => {
            if (answers.split('/').length < 2) return 'not much of a poll if there\'s only one option.';
            if (answers.split('/').length > 5) return 'the maximum number of answers you can have is 5.';
            return true;
          }
        }
      ]
    });
  }

  async run(msg, args) {
    let answers = args.answers.split('/');
    let answerContent = '';
    let emojiArray = ['\u0031\u20E3', '\u0032\u20E3', '\u0033\u20E3', '\u0034\u20E3', '\u0035\u20E3'];

    for (let i = 0; i < answers.length; i++) {
      answerContent += `:${numconverter.toWords(i + 1)}: ${answers[i]}\n\n`;
    }

    if (answerContent.length > 1024) return msg.reply('your poll responses have too many characters!');

    msg.channel.send(new RichEmbed()
    .setColor(0x7bff00)
    .addField(args.question, answerContent)).then(async (message) => {
      for (let i = 0; i < answers.length; i++) {
        await message.react(emojiArray[i]);
      }
    });
  }
};
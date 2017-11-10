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
        },
        {
          key: 'votetime',
          label: 'time to wait for votes',
          prompt: 'How long should people be able to vote for? Answer in seconds.',
          type: 'integer',
          validate: votetime => {
            if (votetime < 5 || votetime > 600) return 'the time to vote must be between 10 and 600 seconds, inclusive.';
            return true;
          }
        }
      ]
    });
  }

  run(msg, args) {
    let answers = args.answers.split('/');
    let answerContent = '';

    for (let i = 0; i < answers.length; i++) {
      answerContent += `:${numconverter.toWords(i + 1)}: ${answers[i]}\n\n`;
    }

    if (answerContent.length > 1024) return msg.reply('your poll responses have too many characters!');

    msg.channel.send(new RichEmbed()
    .setColor(0x7bff00)
    .addField(args.question, answerContent)
    .addField('Poll Info', `Created by ${msg.author.tag}. Vote by sending \`!vote <option to vote for>\` in this channel. You have ${args.votetime} seconds!`)).then(async message => {
      let voteRegex = /!vote [1-5]/i;
      let voteArray = [];
      for (let i = 0; i < answers.length; i++) {
        voteArray.push(0);
      }

      let voteMsgs = await msg.channel.awaitMessages(m => voteRegex.test(m), {max: 100, time: args.votetime * 1000});

      for (let [id, voteMsg] of voteMsgs) { //eslint-disable-line no-unused-vars
        voteMsg.delete('poll vote');
        voteMsgs = voteMsgs.filter(m => m.author.id === voteMsg.author.id);
        let voteNum = parseInt(voteMsg.content.split(' ')[1], 10);
        if (voteNum <= answers.length) {
          if (voteMsg === voteMsgs.first()) voteArray[voteNum - 1] += 1;
        }
      }

      answerContent = answerContent.split('\n\n');
      for (let i = 0; i < answers.length; i++) {
        answerContent[i] += ` (Votes: ${voteArray[i]})\n\n`;
      }

      message.edit(new RichEmbed()
      .setColor(0x7bff00)
      .addField(args.question, answerContent)
      .setFooter(`Poll created by ${msg.author.tag}. Voting has now ended.`));
    });
  }
};
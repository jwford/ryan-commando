const { Command } = require('discord.js-commando');
const numconverter = require('number-to-words');
const ms = require('ms');

module.exports = class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'useful',
      memberName: 'poll',
      description: 'Useful command for polls.',
      details: 'Use this command for polls! You can have a maximum of 5 options. The question you are asking *must* be surrounded by quotes, and each answer should be separated by `/`. The maximum time you can set is 10 minutes.',
      examples: ['`r;poll "Who\'s the best Green brother?" John/Hank/Dave 5 minutes`'],
      guildOnly: true,
      args: [
        {
          key: 'question',
          prompt: 'What question would you like to ask?',
          type: 'string',
          validate: question => {
            if (question.length > 256) return 'questions have a maximum length of 256 characters.';
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
          prompt: 'How long should people be able to vote for? The maximum is 10 minutes.',
          type: 'string',
          validate: votetime => {
            if (ms(votetime) > 600000 || typeof ms(votetime) === 'undefined') return 'that\'s not a valid amount of time. Polls have a maximum length of 10 minutes.';
            return true;
          }
        }
      ]
    });
  }

  run(msg, args) {
    let answers = args.answers.split('/');
    let answerContent = `**${args.question}**`;
    let votetime = ms(args.votetime);

    for (let i = 0; i < answers.length; i++) {
      answerContent += `\n\n:${numconverter.toWords(i + 1)}: ${answers[i]}`;
    }

    if (answerContent.length > 2000) return msg.reply('oops, that poll has too many characters to send.');

    msg.channel.send(`${answerContent}\n\nPoll created by ${msg.author.tag}. You have ${args.votetime} to vote on this poll by sending \`!vote <option>\`.`).then(async message => {
      let voteRegex = /!vote [1-5]/i;
      let voteArray = [];
      for (let i = 0; i < answers.length; i++) {
        voteArray.push(0);
      }

      let voteMsgs = await msg.channel.awaitMessages(m => voteRegex.test(m), {time: votetime});

      for (let [id, voteMsg] of voteMsgs) { //eslint-disable-line no-unused-vars
        voteMsg.delete('poll vote');
        let filteredVoteMsgs = voteMsgs.filter(m => m.author.id === voteMsg.author.id);
        let voteNum = parseInt(voteMsg.content.split(' ')[1], 10);
        if (voteNum <= answers.length) {
          if (voteMsg === filteredVoteMsgs.first()) voteArray[voteNum - 1] += 1;
        }
      }

      answerContent = answerContent.split('\n\n');
      for (let i = 0; i < answers.length; i++) {
        answerContent[i + 1] += ` **(Votes: ${voteArray[i]})**`;
      }

      answerContent = `${answerContent.join('\n\n')}\n\nPoll created by ${msg.author.tag}. Voting has ended.`;
      if (answerContent.length > 2000) return msg.reply('weelll this is embarassing. That poll has too many characters to send. Blame Discord, not me.');

      message.edit(answerContent);
    });
  }
};
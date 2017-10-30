const { Command } = require('discord.js-commando');

module.exports = class MarkdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'markdown',
      group: 'useful',
      memberName: 'markdown',
      description: 'Need help with markup? This is for you!',
      args: [{
        key: 'question',
        label: 'question',
        prompt: 'What do you want to know how to do?',
        type: 'string',
        default: ''
      }]
    });
  }

  run(msg, args) {
    let query = args.question;

    switch (query) {
    case 'italics':
      msg.channel.send('\`*italics*\`');
      break;
    case 'bold':
      msg.channel.send('\`**bold**\`');
      break;
    case 'bold italics':
      msg.channel.send('\`***bold italics***\`');
      break;
    case 'strikeout':
      msg.channel.send('\`~~strikeout~~\`');
      break;
    case 'underline':
      msg.channel.send('\`__underline__\`');
      break;
    case 'underline italics':
      msg.channel.send('\`__*underline italics*__\`');
      break;
    case 'underline bold':
      msg.channel.send('\`__**underline bold**__\`');
      break;
    case 'underline bold italics':
      msg.channel.send('\`__***underline bold italics***__\`');
      break;
    case '':
      msg.channel.send('*italics* \n \n**bold** \n \n***bold italics***\n \n~~strikeout~~ \n \n__underline__ \n \n__*underline italics*__ \n \n__**underline bold**__ \n \n__***underline bold italics***__ \n \nThe code blocks are done with backticks. Single backtick on either side for a one line code block, three backticks for a multi-line code block.', {code: 'fix'});
      break;
    default:
      msg.reply('that\'s not a markdown thing. Stop making typos before the Jonathans notice.');
    }
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const docList = require('../../data.json').docs;

module.exports = class GetDocCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'getdoc',
      aliases: ['doc', 'accio'],
      group: 'useful',
      memberName: 'getdoc',
      description: 'Need a doc? This is the command for you!',
      details: 'Instead of giving Ryan a doc code with this command, you can say "list" to get a list of all the doc codes.',
      examples: ['`r;doc tuatara report`', '`r;doc list`'],
      args: [{
        key: 'doc',
        label: 'doc code',
        prompt: 'Input the doc you want to get.',
        type: 'string',
        validate: doc => {
          if (!docList[doc] && doc.toLowerCase() !== 'list') return 'looks like you either made a typo, or you need to yell at Ench to add that doc.';
          return true;
        }
      }]
    });
  }

  run(msg, args) {
    if (args.doc.toLowerCase() === 'list') {
      let list = '';
      for (let docCode in docList) {
        list += `${docCode}\n`;
      }
      return msg.channel.send(list.slice(0, -1));
    }

    msg.channel.send(new RichEmbed()
    .addField(`Here's your doc, ${msg.member.displayName}`, `${docList[args.doc.toLowerCase()]}`, true)
    .setColor(0xef7300));
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const docList = require('../../data.json').docs;

module.exports = class GetDocCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'getdoc',
      aliases: ['doc', 'accio'],
      group: 'info_useful',
      memberName: 'getdoc',
      description: 'Need a doc? This is the command for you!',
      format: '[doc]',
      args: [{
        key: 'doc',
        label: 'doc',
        prompt: 'Input the doc you want to get.',
        type: 'string'
      }]
    });
  }

  run(msg, args) {
    let deathlyHallows = /;accio deathly hallows/i;
    if (deathlyHallows.test(msg.content)) {
      msg.channel.send(new RichEmbed()
      .addField(`Here's your doc, ${msg.member.displayName}`, 'https://goo.gl/kYuGHQ', true)
      .setColor(0xef7300));
    }

    if (args.doc.toLowerCase() === 'list') {
      let list = '';
      for (let docCode in docList) {
        list += `${docCode}\n`;
      }
      return msg.channel.send(list.slice(0, -2));
    }

    let doc = docList[args.doc.toLowerCase()];
    if (!doc) return msg.channel.send('Either I can\'t retrieve that doc (blame Ench or SJ), or it doesn\'t exist (blame yourself).');

    msg.channel.send(new RichEmbed()
    .addField(`Here's your doc, ${msg.member.displayName}`, '<' + doc + '>', true)
    .setColor(0xef7300));
  }
};

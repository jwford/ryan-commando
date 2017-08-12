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
      const embed = new RichEmbed()
      .setColor(0xef7300)
      .addField(`Here's your doc, ${msg.member.displayName}`, 'https://goo.gl/kYuGHQ', true);
      return msg.channel.send({embed});
    }

    var doc = docList[args.doc.toLowerCase()];

    if(!doc) return msg.channel.send('Either I can\'t retrieve that doc (blame Enchilada or BoedJ), or it doesn\'t exist (blame yourself).');

    const embed = new RichEmbed()
    .setColor(0xef7300)
    .addField(`Here's your doc, ${msg.member.displayName}`, '<' + doc + '>', true);
    msg.channel.send({embed});
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SideServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sideservers',
      aliases: ['sideserver'],
      group: 'tuataria',
      memberName: 'sideservers',
      description: 'Lists Tuataria side servers, with their invite links.',
      details: 'The links that this command provides don\'t work on iOS at this time. #BlameDiscord.'
      args: [
        {
          key: 'sideserver',
          prompt: 'Which sideserver would you like a link to?',
          type: 'string',
          default: ''
        }
      ]
    });
  }

  run(msg) {
    let servers = {
      'Codetaria': 'https://discord.gg/yFKMrvZ',
      'Gamataria': 'https://discord.gg/8uTmbuX',
      'Hogwartaria': 'https://discord.gg/kVRp4Q7',
      'Tuataria Book Club': 'https://discord.gg/f5XvUgd',
      'Tuatariglot': 'https://discord.gg/cMZ5yWN',
      'Typotaria': 'https://discord.gg/QhZaK8a',
      '100 days': 'https://discord.gg/Jh4JMVn'
    };
    if (args.sideserver) {
      return msg.reply(args.sideserver in servers ? servers[args.sideserver] : 'I couldn\'t find that server');
    }
    let serverList = [];
    for (server in servers) {
      serverList.push(`[${server}](${servers[server]})`);
    }
    msg.channel.send(new RichEmbed()
    .setColor(0x276df9)
    .addField('Sideservers', serverList, true));
  }
};

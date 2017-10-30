const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SideServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sideservers',
      aliases: ['sideserver'],
      group: 'tuataria',
      memberName: 'sideservers',
      description: 'Lists Tuataria side servers, with their invite links.'
    });
  }

  run(msg) {
    let serverList = ['[Codetaria](https://discord.gg/yFKMrvZ)', '[Gamataria](https://discord.gg/8uTmbuX)', '[Hogwartaria](https://discord.gg/kVRp4Q7)', '[Tuataria Book Club](https://discord.gg/f5XvUgd)', '[Tuatariglot](https://discord.gg/cMZ5yWN)', '[Typotaria](https://discord.gg/QhZaK8a)', '[100 days](https://discord.gg/Jh4JMVn)'];

    msg.channel.send(new RichEmbed()
    .setColor(0x276df9)
    .addField('Sideservers', serverList, true));
  }
};

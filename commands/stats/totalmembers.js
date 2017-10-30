const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class TotalMembersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'totalmembers',
      group: 'stats',
      memberName: 'totalmembers',
      description: 'Returns the total number of members in the server.',
      guildOnly: true
    });
  }

  run(msg) {
    let collectionSize = msg.guild.members.size;

    if (collectionSize < msg.guild.memberCount) return msg.reply('yell at Enchilada to cache the members.');

    msg.channel.send(new RichEmbed()
    .setColor(0xdbf268)
    .setTitle(`There are ${msg.guild.memberCount} members in ${msg.guild.name}.`));
  }
};
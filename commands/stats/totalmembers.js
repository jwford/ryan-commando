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
    let guild = msg.guild;
    let collectionSize = guild.members.size;

    if (collectionSize !== guild.memberCount) return msg.reply('yell at a modmin to cache the members, I seem to have lost count. Don\'t worry if you have no idea what I just said, they\'ll get it.');

    const embed = new RichEmbed()
    .setColor(0xdbf268)
    .setTitle(`There are ${guild.memberCount} members in ${guild.name}.`);
    msg.channel.send({embed});
  }
};
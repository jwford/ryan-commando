const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class MembersWithRolesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'memberswithroles',
      group: 'stats',
      memberName: 'memberswithroles',
      description: 'Returns the number of members with roles.',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.guild.memberCount !== msg.guild.members.size) return msg.reply('yell at Enchilada to cache the members.');

    let num = msg.guild.members.filter(m => m.roles.size > 1).size;

    const embed = new RichEmbed()
    .setColor(0xdbf268)
    .setTitle(`${msg.guild.name} has ${num} members with roles.`);
    msg.channel.send({embed});
  }
};
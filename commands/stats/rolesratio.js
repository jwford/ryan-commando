const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RolesRatioCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rolesratio',
      group: 'stats',
      memberName: 'rolesratio',
      description: 'Gives the percentage of members with roles.',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.guild.memberCount > msg.guild.members.size) return msg.reply('yell at Enchilada to cache the members.');

    let totalMembers = msg.guild.memberCount;
    let memberswithRoles = msg.guild.members.filter(m => m.roles.size > 1).size;

    msg.channel.send(new RichEmbed()
    .setColor(0xdbf268)
    .setTitle(`${Math.floor((memberswithRoles / totalMembers) * 100)}% of the members in ${msg.guild.name} have roles.`));
  }
};
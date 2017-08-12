const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class ListMembersInCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'membersin',
      group: 'stats',
      memberName: 'membersin',
      description: 'List the members in a certain role.',
      guildOnly: true,
      args: [{
        key: 'role',
        label: 'role',
        prompt: 'What role do you want information about?',
        type: 'role'
      }]
    });
  }

  run(msg, args) {
    var role = args.role;

    if (!msg.channel.guild.roles.get(role.id)) return msg.reply('I can\'t find that role.');

    if (role.name === 'Muted' && !msg.member.hasPermission('MANAGE_ROLES')) return msg.reply('Only modmins can see who has that role.');
    var members = role.members.map(u => u.user.username).join(', ').replace(/@/g, '');

    if (members.length > 1024) {
      members = 'There\'s too many users in this role to display.';
    } else if (members.length === 0) {
      members = 'No users in this role.';
    }

    const embed = new RichEmbed()
    .addField(`${role.members.size} members in the ${role.name} role: `, members)
    .setColor(0xdbf268)
    .setFooter(`ID: ${role.id}`)
    .setTimestamp();
    msg.channel.send({embed});
  }
};

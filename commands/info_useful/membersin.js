const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class ListMembersInCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'membersin',
      group: 'useful',
      memberName: 'membersin',
      description: 'List the members in a certain role.',
      details: 'This command gives you the number of members in a role, and a list of their usernames. If there are too many people in the role (this number changes depending on how long people\'s usernames are), then Ryan will tell you.',
      examples: ['`r;membersin gryffindor`'],
      guildOnly: true,
      args: [{
        key: 'role',
        label: 'role',
        prompt: 'What role do you want information about?',
        type: 'role'
      }],
      guarded: true
    });
  }

  run(msg, args) {
    if (args.role.name === 'Muted' && !msg.member.hasPermission('MANAGE_ROLES')) return msg.reply('only modmins can see who has that role.');
    let members = args.role.members.map(u => u.user.username).join(', ').replace(/@/g, '');

    if (members.length > 1024) {
      members = 'There\'s too many users in this role to display.';
    } else if (members.length === 0) {
      members = 'No users in this role.';
    }

    msg.channel.send(new RichEmbed()
    .addField(`${args.role.members.size} members in the ${args.role.name} role: `, members)
    .setColor(0xdbf268)
    .setFooter(`ID: ${args.role.id}`)
    .setTimestamp());
  }
};

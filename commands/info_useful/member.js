const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');

module.exports = class MemberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'member',
      group: 'info_useful',
      memberName: 'memberinfo',
      description: 'Displays an overview of a member.',
      guildOnly: true,
      args: [{
        key: 'member',
        prompt: 'Who would you like information about? You can use the member\'s username or nickname.',
        type: 'member'
      }]
    });
  }

  run(msg, args) {
    var member = args.member;
    var user = member.user;

    var roles = member.roles.map(r => r.name).sort().join(', ').replace(/@/g, '');

    const embed = new RichEmbed()
    .setAuthor(`${user.tag}`, `${user.displayAvatarURL}`)
    .setColor(0x9bf442)
    .addField('Username: ', user.username, true)
    .addField('Status: ', user.presence.status, true)
    .addField(`Joined ${msg.guild.name}: `, moment(member.joinedTimestamp).format('MMM Do YYYY @ HH:mm [GMT]ZZ'), true)
    .addField('Roles: ', roles);
    msg.channel.send({embed});
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');
const prettyMs = require('pretty-ms');

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
    let member = args.member;
    let user = member.user;

    let roles = member.roles.filter(r => r.name !== '@everyone').map(r => r.name).join(', ');
    if (roles === '') roles = 'None';

    msg.channel.send(new RichEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .addField(`Joined ${msg.guild.name}`, `${moment(member.joinedTimestamp).format('MM-DD-YY')} (${prettyMs(Date.now() - member.joinedTimestamp, {compact: true, verbose: true}).slice(1)} ago)`)
    .addField('Roles', roles)
    .setColor(0x9bf442)
    .setTimestamp());
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');
const prettyMs = require('pretty-ms');

module.exports = class MemberCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'member',
      group: 'useful',
      memberName: 'memberinfo',
      description: 'Displays a brief overview of a member\'s information.',
      details: 'This command shows you a member\'s username, profile picture, when they joined the server, and the list of roles they have.',
      examples: ['`r;member erinclements`', '`r;member #3312`'],
      guildOnly: true,
      args: [{
        key: 'member',
        prompt: 'Who would you like information about? You can use the member\'s username or nickname.',
        type: 'member'
      }]
    });
  }

  run(msg, args) {
    let roles = args.member.roles.filter(r => r.name !== '@everyone').map(r => r.name).join(', ');
    if (roles === '') roles = 'None';

    msg.channel.send(new RichEmbed()
    .setAuthor(args.member.user.tag, args.member.user.displayAvatarURL)
    .addField(`Joined ${msg.guild.name}`, `${moment(args.member.joinedTimestamp).format('MM-DD-YY')} (${prettyMs(Date.now() - args.member.joinedTimestamp, {compact: true, verbose: true}).slice(1)} ago)`)
    .addField('Roles', roles)
    .setColor(0x9bf442)
    .setTimestamp());
  }
};

const { Command } = require('discord.js-commando');

module.exports = class UnSelfAssignCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tuaunselfassign',
      aliases: ['nomorenotifications', 'unnotisquad', 'bainotisquad'],
      group: 'tuataria',
      memberName: 'unselfassign',
      description: 'Removes a member from the Notification Squad role.',
      guildOnly: true
    });
  }

  run(msg) {
    var bingbongbunch = msg.guild.roles.find('name', 'Notification Squad');
    if (!bingbongbunch) return msg.reply('uhh, somebody messed up somewhere because I can\'t seem to find the Notification Squad role.');

    if (!msg.member.roles.exists('name', 'Notification Squad')) return msg.reply('You\'re not in the Notification Squad... sooo.... yeah.');

    msg.member.removeRole(bingbongbunch);
    msg.channel.send(`${msg.member.displayName}, you\'ve been removed from the Notification Squad.`);
  }
};

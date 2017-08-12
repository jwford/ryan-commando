const { Command } = require('discord.js-commando');

module.exports = class SelfAssignCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tuaselfassign',
      aliases: ['notificationsquad', 'notisquad'],
      group: 'tuataria',
      memberName: 'selfassign',
      description: 'Self-assign command for Tuataria',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.content.slice(1) === 'notisquad' || msg.content.slice(1) === 'notificationsquad') {
      var bingbongbunch = msg.guild.roles.find('name', 'Notification Squad');
      if (!bingbongbunch) return msg.reply('Whoops, I can\'t seem to find that role.');

      if (msg.member.roles.exists('name', 'Notification Squad')) return msg.reply('You\'re already in the Notification Squad!');

      msg.member.addRole(bingbongbunch);
      msg.channel.send(`Welcome to the Notification Squad, ${msg.member.displayName}!`);
    } else return msg.reply('Hmmm...are you sure you typed that right?');
  }
};

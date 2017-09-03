const { Command } = require('discord.js-commando');

module.exports = class SelfAssignCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tuaselfassign',
      aliases: ['notificationsquad', 'notisquad', 'gmt-11', 'gmt-10', 'gmt-9', 'gmt-8', 'gmt-7', 'gmt-6', 'gmt-5', 'gmt-4', 'gmt-3', 'gmt-2:30', 'gmt-2', 'gmt-1', 'gmt', 'gmt', 'gmt+1', 'gmt+2', 'gmt+3',
        'gmt+4', 'gmt+5', 'gmt+5:30', 'gmt+6', 'gmt+7', 'gmt+8', 'gmt+9', 'gmt+9:30', 'gmt+10', 'gmt+11', 'gmt+12', 'gmt+13', 'gmt+14', 'gmt-less'],
      group: 'tuataria',
      memberName: 'selfassign',
      description: 'Self-assign command for Tuataria',
      guildOnly: true
    });
  }

  async run(msg) {
    let role = msg.content.slice(2);
    //notification squad
    if (role === 'notisquad' || role === 'notificationsquad') {
      var bingbongbunch = msg.guild.roles.find('name', 'Notification Squad');
      if (!bingbongbunch) return msg.reply('Whoops, I can\'t seem to find that role.');

      if (msg.member.roles.exists('name', 'Notification Squad')) return msg.reply('You\'re already in the Notification Squad!');

      msg.member.addRole(bingbongbunch);
      msg.channel.send(`Welcome to the Notification Squad, ${msg.member.displayName}!`);
    }

    //timezones
    if (role.startsWith('gmt')) {
      let hasTimezone = await this.hasTimezone(msg.member);

      if (hasTimezone === false) {
        return msg.reply('you don\'t have a timezone yet! Ask a modmin for one!');
      } else if (hasTimezone === 'multiple timezones') {
        return msg.reply('you seem to have more than one timezone... ask a modmin to sort this out for you.');
      } else if (hasTimezone === true) {
        if (role === 'gmt-less') {
          role = 'GMT-less';
        } else role = role.toUpperCase();

        let newTimezone = msg.guild.roles.find('name', role);

        for (let [id, memberRole] of msg.member.roles) { //eslint-disable-line no-unused-vars
          if (memberRole.name.startsWith('GMT')) {
            var currentTimezone = memberRole;
            break;
          }
        }

        if (currentTimezone.name === currentTimezone.name) return msg.reply('why are you trying to make me do work for no reason? :frowning:');
        msg.member.removeRole(currentTimezone);
        msg.member.addRole(newTimezone);
        msg.channel.send(`You changed your timezone from ${currentTimezone.name} to ${newTimezone.name}!`);
      }
    }
  }

  hasTimezone(member) {
    let count = 0;
    for (let [id, role] of member.roles) { //eslint-disable-line no-unused-vars
      if (role.name.startsWith('GMT')) count += 1;
    }

    if (count === 1) {
      return true;
    } else if (count === 0) {
      return false;
    } else {
      return 'multiple timezones';
    }
  }
};

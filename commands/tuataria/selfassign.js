const { Command } = require('discord.js-commando');

module.exports = class SelfAssignCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tuaselfassign',
      aliases: ['notificationsquad', 'notisquad', 'gmt-11', 'gmt-10', 'gmt-9', 'gmt-8', 'gmt-7', 'gmt-6', 'gmt-5', 'gmt-4', 'gmt-3', 'gmt-2:30', 'gmt-2', 'gmt-1', 'gmt', 'gmt', 'gmt+1', 'gmt+2', 'gmt+3',
        'gmt+4', 'gmt+5', 'gmt+5:30', 'gmt+6', 'gmt+7', 'gmt+8', 'gmt+9', 'gmt+9:30', 'gmt+10', 'gmt+11', 'gmt+12', 'gmt+13', 'gmt+14', 'gmt-less', 'huntsquad'],
      group: 'tuataria',
      memberName: 'selfassign',
      description: 'Self-assign/timezone role switch command for Tuataria',
      guildOnly: true
    });
  }

  async run(msg) {
    if (msg.guild.id !== '273689397675687940') return msg.delete();

    let role = msg.content.slice(2);
    if (role === 'tuaselfassign') return msg.reply('you need to use one of the aliases of this command for it to do anything :stuck_out_tongue:');

    //notification squad
    if (role === 'notisquad' || role === 'notificationsquad') {
      let bingbongbunch = msg.guild.roles.get('323972051176128512');
      if (!bingbongbunch) return msg.reply('Whoops, I can\'t seem to find that role.');

      if (!msg.member.roles.exists('name', 'Notification Squad')) {
        msg.member.addRole(bingbongbunch);
        msg.channel.send(`Welcome to the Notifcation Squad, ${msg.member.displayName}!`);
      } else return msg.reply('you\'re already in the Notification Squad!');
    }

    //hunt squad
    if (role === 'huntsquad') {
      let huntsquad = msg.guild.roles.get('355407537702436867');
      if (!huntsquad) return msg.reply('somebody messed up somewhere because I can\'t find the Hunt Squad role.');

      if (!msg.member.roles.exists('name', 'Hunt Squad')) {
        msg.member.addRole(huntsquad);
        msg.channel.send(`Welcome to the Hunt Squad, ${msg.member.displayName}`);
      } else return msg.reply('you\'re already in the Hunt Squad!');
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

        if (currentTimezone.name === newTimezone.name) return msg.reply('why are you trying to make me do work for no reason? :frowning:');
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

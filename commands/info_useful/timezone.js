const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const moment = require('moment');
const hostTimezone = 'GMT+8';

module.exports = class TimezoneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'timezone',
      aliases: ['time'],
      group: 'info_useful',
      memberName: 'timezone',
      description: 'Converts timezones.',
      guildOnly: true,
      args: [
        {
          key: 'time',
          label: 'time to convert',
          type: 'string',
          prompt: 'What time would you like to convert? HH:mm (24 hr) format please.'
        },
        {
          key: 'oldZone',
          label: 'timezone to convert from',
          type: 'string',
          prompt: 'What timezone would you like to convert from? Enter "me" to use the the timezone from your timezone role, or the display name of another user to use their timezone role.'
        },
        {
          key: 'newZone',
          label: 'timezone to convert to',
          type: 'string',
          prompt: 'What timezone would you like to convert to? Enter "me" to use the timezone from your timezone role, or the display name of another user to use their timezone role.'
        }
      ]
    });
  }

  run(msg, args) {
    //get/check validity of time
    let oldTime = this.isValidTime(args.time);
    if (oldTime === 'invalid time') return msg.reply('the time you entered is invalid. Did you make a typo, or are you trying to be annoying and break me?');

    //get/check validity of timezones
    var oldZone = this.getTimezone(msg, args.oldZone);
    var newZone = this.getTimezone(msg, args.newZone);
    if (oldZone === 'no member' || newZone === 'no member') return msg.reply('you entered an invalid display name. Remember, I need the full display name, not a partial name/username. Tagging the user also won\'t work.');
    if (oldZone === 'no timezone' || newZone === 'no timezone') return msg.reply('one (or both) of those users doesn\'t have a timezone role. They can ask a modmin for one though, and hopefully that modmin will remember to let me add the role.');
    if (oldZone === 'invalid timezone' || newZone === 'invalid timezone') return msg.reply('one (or both) of your timezones are invalid. Try a bit harder next time.');

    if (oldTime === 'now') {
      let baseCurrentTime = moment().format('HH:mm');
      let calculate = this.calculateTime(baseCurrentTime, hostTimezone, oldZone);
      oldTime = calculate[2];
    }

    let result = this.calculateTime(oldTime, oldZone, newZone);
    let prevDay = result[0];
    let nextDay = result[1];
    let newTime = result[2];

    if (prevDay === true) {
      const embed = new RichEmbed()
      .setColor(0x0be86b)
      .addField(`Time in ${oldZone.toUpperCase()}:`, oldTime, true)
      .addField(`Time in ${newZone.toUpperCase()}:`, `${newTime} on the previous day.`, true);
      msg.channel.send({embed});
    } else if (nextDay === true) {
      const embed = new RichEmbed()
      .setColor(0x0be86b)
      .addField(`Time in ${oldZone.toUpperCase()}:`, oldTime, true)
      .addField(`Time in ${newZone.toUpperCase()}:`, `${newTime} on the next day.`, true);
      msg.channel.send({embed});
    } else {
      const embed = new RichEmbed()
      .setColor(0x0be86b)
      .addField(`Time in ${oldZone.toUpperCase()}:`, oldTime, true)
      .addField(`Time in ${newZone.toUpperCase()}:`, `${newTime} on the same day.`, true);
      msg.channel.send({embed});
    }
  }

  calculateTime(oldTime, oldZone, newZone) {
    let prevDay = false;
    let nextDay = false;
    let oldZoneHours;
    let oldZoneMinutes;
    let newZoneHours;
    let newZoneMinutes;

    var newTime = oldTime.split(':');

    //handle getting numbers for oldZone
    if (oldZone === 'GMT') {
      oldZoneHours = 0;
      oldZoneMinutes = 0;
    }
    if (oldZoneHours !== 0 && oldZone.length > 6) {
      oldZoneHours = oldZone.slice(3, 6);
      oldZoneMinutes = oldZone.slice(-2);
      if (oldZoneHours.endsWith(':')) {
        oldZoneHours = oldZoneHours.slice(0, -1);
      }
    } else if (oldZoneHours !== 0 && oldZone.length <= 6) {
      oldZoneHours = oldZone.slice(3);
      oldZoneMinutes = 0;
    }

    //handle getting numbers for newZone
    if (newZone === 'GMT') {
      newZoneHours = 0;
      newZoneMinutes = 0;
    }
    if (newZoneHours !== 0 && newZone.length > 6) {
      newZoneHours = newZone.slice(3, 6);
      newZoneMinutes = newZone.slice(-2);
      if (newZoneHours.endsWith(':')) {
        newZoneHours = newZoneHours.slice(0, -1);
      }
    } else if (newZoneHours !== 0 && newZone.length <= 6) {
      newZoneHours = newZone.slice(3);
      newZoneMinutes = 0;
    }
    //parseInt the shit
    oldZoneHours = parseInt(oldZoneHours, 10);
    oldZoneMinutes = parseInt(oldZoneMinutes, 10);
    newZoneHours = parseInt(newZoneHours, 10);
    newZoneMinutes = parseInt(newZoneMinutes, 10);
    newTime[0] = parseInt(newTime[0], 10);
    newTime[1] = parseInt(newTime[1], 10);

    //find hour difference
    var hourDiff = Math.abs(oldZoneHours - newZoneHours);

    //add/subtract hour difference to newTime[0]
    if (oldZoneHours >= newZoneHours) {
      newTime[0] -= hourDiff;
      newTime[1] -= oldZoneMinutes;
    } else if (oldZoneHours < newZoneHours) {
      newTime[0] += hourDiff;
      newTime[1] += newZoneMinutes;
    }

    if (newTime[1] < 0) {
      newTime[1] = 60 - Math.abs(newTime[1]);
      newTime[0] -= 1;
    }
    if (newTime[1] >= 60) {
      newTime[1] -= 60;
      newTime[0] += 1;
    }
    if (newTime[0] >= 24) {
      newTime[0] = Math.abs(newTime[0] - 24);
      nextDay = true;
    }
    if (newTime[0] < 0) {
      newTime[0] += 24;
      prevDay = true;
    }

    newTime[0] = newTime[0].toString();
    newTime[1] = newTime[1].toString();

    if (newTime[0].length < 2) newTime[0] = newTime[0].padStart(2, '0');
    if (newTime[1] === '0') newTime[1] = '00';
    if (newTime[1].length === 1) newTime[1] = newTime[1].padStart(2, '0');

    newTime = newTime.join(':');

    return [prevDay, nextDay, newTime];
  }

  getTimezone(msg, arg) {
    if (arg.toUpperCase().startsWith('GMT')) {
      var valid = this.isValidTimezone(arg);
      if (valid === 'invalid timezone') return 'invalid timezone';
      return valid;
    }
    var member;
    var roles;
    if (arg.toLowerCase() === 'me') {
      member = msg.member;
    } else {
      member = msg.guild.members.find('displayName', arg);
      if (!member) return 'no member';
    }

    roles = member.roles;
    var hasTimeRole = false;
    for (var [id, role] of roles) { //eslint-disable-line no-unused-vars
      var roleName = role.name;
      hasTimeRole = true;
      if (roleName.startsWith('GMT')) return roleName;
    }
    if (hasTimeRole === false) return 'no timezone role';
    return 'no timezone';
  }

  isValidTimezone(timezone) {
    //GMT goes from -12 to +14
    //fucker timezones are either xx:30 or xx:45
    //check: starts with GMT
    if (timezone.slice(0,3).toUpperCase() !== 'GMT') return 'invalid timezone';
    //check: is GMT
    if (timezone.length === 3) return timezone;
    if (timezone[3] !== '+' && timezone[3] !== '-') return 'invalid timezone';

    //set hourMax depending on gmt+ (=14) or gmt- (=12)
    let hourMax = 12;
    if (timezone[3] === '+') hourMax = 14;

    //check time part of timezone (dealing with the fuckers in the snowflake xx:xx timezones)
    if (timezone.length < 5) return 'invalid timezone';
    let number = timezone.slice(4);
    if (number.includes(':')) {
      let time = number.split(':');
      //make sure there is only a single ':'
      if (time.length > 2) return 'invalid timezone';
      let hours = parseInt(time[0], 10);
      let minutes = parseInt(time[1], 10);
      if (!(hours > 0 && hours <= hourMax)) return 'invalid timezone';
      if (!((minutes === 30 || minutes === 45) && hours < hourMax)) return 'invalid timezone';
    } else if (number.length <= 3) {
      let hours = parseInt(number, 10);
      if (!(hours > 0 && hours <= hourMax)) return 'invalid timezone';
    } else {
      return 'invalid timezone';
    }
    return timezone;
  }

  isValidTime(time) {
    if (time === 'now') return time;
    var validTime = /[0-2][0-9]:[0-5][0-9]/;
    if (!validTime.test(time)) return 'invalid time';
    if (parseInt(time, 10) > 23 || parseInt(time, 10) < 0) return 'invalid time';
    return time;
  }
};

const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const prettyMs = require('pretty-ms');

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      group: 'useful',
      memberName: 'stats',
      description: 'Provides statistics about a server.',
      details: 'This command gives the total number of members, the number of members with at least 1 role, and the percentage of members of the server who have at least one role.',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.guild.members.size < msg.guild.memberCount) return msg.reply('yell at Enchilada to cache the members (he\'ll know what that means).');

    msg.channel.send(new RichEmbed()
    .setAuthor(msg.guild.name, msg.guild.iconURL)
    .setColor(0xdbf268)
    .addField('Total Members', msg.guild.memberCount, true)
    .addField('Members with Roles', msg.guild.members.filter(m => m.roles.size > 1).size, true)
    .addField('Percentage', `${Math.floor((msg.guild.members.filter(m => m.roles.size > 1).size / msg.guild.memberCount) * 100)}%`, true)
    .setFooter(`Server created ${prettyMs(Date.now() - msg.guild.createdTimestamp, {compact: true, verbose: true}).slice(1)} ago.`)
  );
  }
};
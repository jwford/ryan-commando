const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class SelfAssignCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hpselfassign',
      aliases: ['gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff', 'hornedserpent', 'pukwudgie', 'thunderbird', 'wampus', 'tuatara', 'koala', 'selfcarebunny', 'selflovebird'],
      group: 'hogwartaria',
      memberName: 'selfassign',
      description: 'Allows members to sort themselves into various houses on Hogwartaria.',
      guildOnly: true
    });
  }

  run(msg) {
    if (msg.guild.id !== '311165518080114688') return msg.delete();

    //get role from alias
    let house = msg.content.slice(2);
    if (house === 'hornedserpent') {
      house = 'Horned Serpent';
    } else if (house === 'selfcarebunny') {
      house = 'Self-care bunny';
    } else if (house === 'selflovebird') {
      house = 'Self-love Bird';
    } else house = house.slice(0, 1).toUpperCase() + house.slice(1);

    if (msg.guild.roles.exists('name', house)) {
      house = msg.guild.roles.find('name', house);
    } else return msg.reply('I can\'t seem to find that house.');

    //check for compatibility with existing houses
    if (msg.member.roles.exists('name', house.name)) return msg.reply('you\'re already in that house!');

    if (house.name === 'Gryffindor') {
      if (msg.member.roles.exists('name', 'Ravenclaw') || msg.member.roles.exists('name', 'Slytherin') || msg.member.roles.exists('name', 'Hufflepuff')) return msg.reply('you\'re already in a Hogwarts house!');
    } else if (house.name === 'Ravenclaw') {
      if (msg.member.roles.exists('name', 'Gryffindor') || msg.member.roles.exists('name', 'Slytherin') || msg.member.roles.exists('name', 'Hufflepuff')) return msg.reply('you\'re already in a Hogwarts house!');
    } else if (house.name === 'Slytherin') {
      if (msg.member.roles.exists('name', 'Ravenclaw') || msg.member.roles.exists('name', 'Gyrffindor') || msg.member.roles.exists('name', 'Hufflepuff')) return msg.reply('you\'re already in a Hogwarts house!');
    } else if (house.name === 'Hufflepuff') {
      if (msg.member.roles.exists('name', 'Ravenclaw') || msg.member.roles.exists('name', 'Slytherin') || msg.member.roles.exists('name', 'Gryffindor')) return msg.reply('you\'re already in a Hogwarts house!');
    }

    //add the role
    msg.member.addRole(house);
    msg.channel.send(`Success! Welcome to your new House, ${msg.member.displayName}!`);

    let commonroom = house.name.toLowerCase() + '_common_room';
    if (msg.guild.channels.exists('name', commonroom)) {
      commonroom = msg.guild.channels.find('name', commonroom);
    } else return;

    if (house.name === 'Gryffindor' || house.name === 'Slytherin' || house.name === 'Ravenclaw' || house.name === 'Hufflepuff') {
      msg.channel.send(new RichEmbed()
      .setColor(house.color)
      .setTitle(`${msg.member.displayName} has been sorted into ${house.name} House!`));
    } else return;
  }
};

const { Command } = require('discord.js-commando');

module.exports = class ShirtCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shirt',
      group: 'tuataria',
      memberName: 'shirt',
      description: 'Brings up the shirt promo.',
      details: 'Want to be a shill for Skye and Gus? This is the command for you!',
      guildOnly: true
    });
  }

  run(msg) {
    msg.channel.send('Do you want to show your Tuataria pride in public? YES! Then you should go to DFTBA.com and purchase yourself an It\'s a Tuatara shirt to showcase your pride!! Don\'t forget that 15% of the proceeds goes towards the Foundation to Decrease Worldsuck! Nothing is better than that!! Buy your Tuatara shirt now!! http://tuataria.com/shirt');
  }
};

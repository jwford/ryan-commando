const { Command } = require('discord.js-commando');

module.exports = class LogoutCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'logout',
      group: 'owners',
      memberName: 'logout',
      description: 'Logs out client.',
      details: 'This command is used by Ryan\'s owners to quickly log him out in case of an emergency. Or for fuckery.'
    });
  }

  hasPermission(msg) {
    return this.client.isOwner(msg.author);
  }

  run(msg) {
    msg.channel.send('I\'m headed for a nap! Thanks for all the eucalyptus.');
    console.log(`RyanBot logging out of ${this.client.guilds.map(g => g.name).join(', ')}`);
    this.client.destroy();
  }
};

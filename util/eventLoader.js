const reqEvent = (event) => require(`../events/${event}`);
module.exports = ryanbot => {
  ryanbot.on('commandStatusChange', reqEvent('commandStatusChange'));
  ryanbot.on('debug', reqEvent('debug'));
  ryanbot.on('error', reqEvent('error'));
  ryanbot.on('groupStatusChange', reqEvent('groupStatusChange'));
  ryanbot.on('guildCreate', reqEvent('guildCreate'));
  ryanbot.on('guildDelete', reqEvent('guildDelete'));
  ryanbot.on('message', reqEvent('message'));
  ryanbot.on('messageUpdate', reqEvent('message'));
  ryanbot.on('ready', () => reqEvent('ready')(ryanbot));
  ryanbot.on('reconnecting', () => reqEvent('reconnecting')(ryanbot));
  ryanbot.on('unknownCommand', reqEvent('unknownCommand'));
  ryanbot.on('warn', reqEvent('warn'));
};
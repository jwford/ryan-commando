module.exports = ryanbot => {
  console.log(`Ryan is ready in ${ryanbot.guilds.size} servers! \nServers: ${ryanbot.guilds.map(g => g.name).join(', ')}`);
  ryanbot.user.setGame('r;help');
};
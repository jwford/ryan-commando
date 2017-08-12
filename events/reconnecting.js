module.exports = ryanbot => {
  console.log(`Ryan is reconnecting to ${ryanbot.guilds.map(g => g.name).join(', ')}`);
};
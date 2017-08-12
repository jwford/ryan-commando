module.exports = ryanbot => {
  console.log(`Ryan is ready in ${ryanbot.guilds.size} servers! \nServers: ${ryanbot.guilds.map(g => g.name).join(', ')}`);
  ryanbot.user.setGame('tuataria.com');

  //cache all members of all guilds
  for (let [id, guild] of ryanbot.guilds) { //eslint-disable-line no-unused-vars
    guild.fetchMembers();
  }
};
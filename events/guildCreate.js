module.exports = guild => {
  console.log(`Added to new server: ${guild.name}`);

  guild.fetchMembers();
};
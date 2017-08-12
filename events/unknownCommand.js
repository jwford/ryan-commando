module.exports = msg => {
  let client = msg.guild.members.find('id', '297890742771253258').user.client;
  if (!client) return;
  let tuataria = client.guilds.find('id', '273689397675687940');
  if (!tuataria) return;
  let squid = tuataria.emojis.find('name', 'giantsquidofanger');
  if (!squid) return;

  msg.react(squid);
};

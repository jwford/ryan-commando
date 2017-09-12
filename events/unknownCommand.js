module.exports = msg => {
  let squid = msg.guild.members.get('297890742771253258').user.client.guilds.get('273689397675687940').emojis.get('276372748534677504');
  if (!squid) return;
  msg.react(squid);
};

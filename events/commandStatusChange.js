module.exports = (guild, command, enabled) => {
  if (enabled === false) {
    console.log(`${command.name} disabled in ${guild.name}.`);
  } else console.log(`${command.name} enabled in ${guild.name}`);
};
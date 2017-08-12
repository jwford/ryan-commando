module.exports = (guild, group, enabled) => {
  if (enabled === false) {
    console.log(`The ${group} commands have been disabled in ${guild.name}.`);
  } else console.log(`The ${group} commands have been enabled in ${guild.name}.`);
};
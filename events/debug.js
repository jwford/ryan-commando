module.exports = info => {
  if (info.includes('heartbeat') || info.includes('Heartbeat acknowledged') || info.startsWith('Authenticated using token') || info.startsWith('Connect') || info.startsWith('Using gateway') || info.startsWith('READY') || info.startsWith('Identifying') || info.startsWith('Built')) return;
  console.log(info);
};
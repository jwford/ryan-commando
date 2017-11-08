module.exports = (messageReaction, user) => {
  if (!messageReaction.message.poll || messageReaction.me) return;
  messageReaction.remove(user);
};
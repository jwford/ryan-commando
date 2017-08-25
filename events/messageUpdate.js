const data = require('../data.json');

module.exports = (oldMsg, newMsg) => {
  if (newMsg.channel.id === '342112503746265100') return; //stop auto-reacts in rinfo
  //custom reactions
  var customReactions = [/dftba/i, /thank you steve/i, /thanks steve/i, /thank ya steve/i, /no edge/i, /brain soup/i, /french the llama/i, /mongols/i, /tuatara /i, /all the way down/i];
  for (let r = 0; r < customReactions.length; r++) {
    let react = customReactions[r];
    if (react.test(newMsg.content)) {
      react = react.toString().slice(1, -2);
      if (newMsg.guild.emojis.find('name', data.reacts[react])) {
        newMsg.react(newMsg.guild.emojis.find('name', data.reacts[react]));
      } else {
        console.log(`${data.reacts[react]} doesn\'t exist in ${newMsg.guild.name}.`);
      }
    }
  }

  //default reactions
  var defaultReactions = [/check pins/i, /check the pins/i, /spacex/i, /batter /i, /hi ryan/i];
  for (let r = 0; r < defaultReactions.length; r++) {
    let react = defaultReactions[r];
    if (react.test(newMsg.content)) {
      react = react.toString().slice(1, -2);
      newMsg.react(data.reacts[react]);
    }
  }
};
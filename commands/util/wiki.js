const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const wikipedia = require("node-wikipedia");

module.exports = class WikiCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wiki',
      group: 'util',
      memberName: 'wiki',
      description: 'Define a term using Wikipedia.',
      args: [
        {
          key: 'topic',
          prompt: 'What do you want to look up?',
          type: 'string'
        }
      ]
    });
  }

  async run(msg, args) {
    const topic = args['topic'];
    console.log(topic);
    wikipedia.page.data(topic,{ wikitext: true },function(response){
      if (response) {
        const prettyText = parseWikiText(response.wikitext['*']);
        const embed = new RichEmbed()
        .addField(response.title,prettyText)
        .setColor(0x00ced1)
        .setTimestamp();
        msg.channel.send({embed});
      } else {
        msg.channel.send("Sorry, I couldn't find a wikipedia article about that");
      }
    })
  }


};

function parseWikiText(s) {
  template = new RegExp(/{{[^{]*?}}/g);
  while (template.test(s)){
    s = s.replace(template, ''); // remove templates
  }
  s = s.replace(/\[\[(?:[^\|\]]+\|)?/g, '') //strip the beginnings of links, including masked links
       .replace(/\]\]/g, '') //strip the ends of links
       .replace(/<(?:.|\n)*?>/g, '') // remove HTML tags
       .replace(/\[[0-9]*\]|\[note [0-9]*\]/g, '') // remove citation numbers
       .replace(/''+/g, '**') //replace emphasis formatting
       .replace(/^[\s]*/, ''); //Strip stray whitespace at beginning
  return s.substring(0,s.indexOf('\n'));//just return first paragraph
}

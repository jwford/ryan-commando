const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const escapeRegex = require('escape-string-regexp');

module.exports = class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      group: 'owners',
      memberName: 'eval',
      description: 'Evaluates JavaScript code.',
      args: [{
        key: 'code',
        label: 'code to evaluate',
        prompt: 'What code would you like to evaluate?',
        type: 'string'
      }]
    });
  }

  hasPermission(msg) {
    return this.client.isOwner(msg.author);
  }

  run(msg, args) {
    /*eslint-disable no-unused-vars*/
    const bot = this.client;
    const tuataria = this.client.guilds.get('273689397675687940');
    const hogwartaria = this.client.guilds.get('311165518080114688');
    const gamataria = this.client.guilds.get('318756188135227402');
    /*eslint-enable no-unused-vars*/

    let code = args.code;

    try {
      let evaledCode = eval(code);

      evaledCode = require('util').inspect(evaledCode, {depth: 0}).replace(this.tokenPattern, 'Hmm.... how bout I not show you my token.');
      if (evaledCode.length > 2000) return msg.channel.send('Result has too many characters to display.', {code: 'js'});

      msg.channel.send(new RichEmbed()
      .addField('Evaluated Code', `\`\`\`js\n${evaledCode}\`\`\``)
      .setColor(0xff2600)
      .setTimestamp());
    } catch (err) {
      msg.channel.send(new RichEmbed()
      .addField('Error', `\`\`\`js\n${err}\`\`\``)
      .setColor(0xff2600)
      .setTimestamp());
    }
  }

  get tokenPattern() {
    if (!this._tokenPattern) {
      let pattern = '';
      if (this.client.token) pattern += escapeRegex(this.client.token);
      Object.defineProperty(this, '_tokenPattern', {value: new RegExp(pattern, 'gi')});
    }

    return this._tokenPattern;
  }
};
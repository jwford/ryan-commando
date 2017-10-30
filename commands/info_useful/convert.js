const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;
const convert = require('convert-units');

module.exports = class ConvertCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'convert',
      aliases: ['transfigure'],
      group: 'useful',
      memberName: 'convert',
      description: 'Converts units. This command is case sensitive, so be careful!',
      args: [
        {
          key: 'num',
          label: 'value',
          prompt: 'What would you like to convert?',
          type: 'float'
        },
        {
          key: 'inputUnit',
          prompt: 'What unit would you like to convert from?',
          type: 'string',
          validate: inputUnit => {
            let possible = convert().possibilities();
            if (possible.includes(inputUnit)) return true;
            return 'that\'s an invalid unit. You may have used improper capitalization.';
          }
        },
        {
          key: 'outputUnit',
          prompt: 'What unit would you like to convert to? You can also say "possible" to get a list of possible units, or "best" to automatically convert to the smallest unit with a value greater than 1.',
          type: 'string',
          validate: outputUnit => {
            if (outputUnit === 'best' || outputUnit === 'possible') return true;
            let possible = convert().possibilities();
            if (possible.includes(outputUnit)) return true;
            return 'that\'s an invalid unit. You may have used improper capitalization.';
          }
        }
      ]
    });
  }

  run(msg, args) {
    let num = args.num;
    let inputUnit = args.inputUnit;
    let outputUnit = args.outputUnit;
    let best = convert(num).from(inputUnit).toBest();

    let outputPossibles = convert().from(inputUnit).possibilities();
    if (outputPossibles.includes(outputUnit)) return msg.reply('you can\'t make that conversion, silly. Try to do better next time.');

    if (inputUnit === 'K' && num < 0) return msg.reply('Kelvin can\'t be negative. Come on now, at least try.');
    if (inputUnit === 'C' && num < -273.15) return msg.reply('that\'s below absolute zero. Nice try though.');
    if (inputUnit === 'F' && num < -459.67) return msg.reply('that\'s below absolute zero. Nice try though.');

    if (inputUnit === 'F' && outputUnit === 'K') return msg.channel.send(new RichEmbed()
    .setColor(0x4280f4)
    .addField('Conversion: ', `${num}${inputUnit} converts to ${Math.round(((((num - 32) * 5 / 9) + 273.15) * 10) / 10).toFixed(1)}${outputUnit}`));


    if (outputUnit === 'possible') {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion Possibilities: ', `${num}${inputUnit} can be converted to ${convert().from(inputUnit).possibilities().join(', ')}`, true));
    } else if (outputUnit === 'best') {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Best Conversion: ', `${num}${inputUnit} is best converted to ${(Math.round(best.val * 10) / 10).toFixed(1)}${best.unit}`, true));
    } else {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion: ', `${num}${inputUnit} converts to ${(Math.round(convert(num).from(inputUnit).to(outputUnit) * 10) / 10).toFixed(1)}${outputUnit}`));
    }
  }
};

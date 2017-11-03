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
      description: 'Converts units.',
      details: 'This command is case sensitive, so be careful!',
      examples: ['`r;convert 50 F C`', '`r;convert 100 ft mi`', '`r;convert 1000 g best`', '`r;convert 10 kg possible`'],
      args: [
        {
          key: 'num',
          label: 'value to convert',
          prompt: 'What would you like to convert?',
          type: 'float'
        },
        {
          key: 'inputUnit',
          prompt: 'What unit would you like to convert from?',
          type: 'string',
          validate: inputUnit => {
            if (convert().possibilities().includes(inputUnit)) return true;
            return 'that\'s an invalid unit. You may have used improper capitalization.';
          }
        },
        {
          key: 'outputUnit',
          prompt: 'What unit would you like to convert to? You can also say "possible" to get a list of possible units, or "best" to automatically convert to the smallest unit with a value greater than 1.',
          type: 'string',
          validate: (outputUnit, msg) => {
            if (outputUnit === 'best' || outputUnit === 'possible') return true;
            let inputUnit = msg.content.split(' ')[2];
            if (convert().from(inputUnit).possibilities().includes(outputUnit)) return true;
            return 'that\'s an invalid unit. You may have used improper capitalization, or tried to do an impossible conversion.';
          }
        }
      ]
    });
  }

  run(msg, args) {
    let inputUnit = args.inputUnit;
    let outputUnit = args.outputUnit;
    let best = convert(args.num).from(inputUnit).toBest();

    if (inputUnit === 'K' && args.num < 0) return msg.reply('Kelvin can\'t be negative. Come on now, at least try.');
    if (inputUnit === 'C' && args.num < -273.15) return msg.reply('that\'s below absolute zero. Nice try though.');
    if (inputUnit === 'F' && args.num < -459.67) return msg.reply('that\'s below absolute zero. Nice try though.');

    if (inputUnit === 'F' && outputUnit === 'K') return msg.channel.send(new RichEmbed()
    .setColor(0x4280f4)
    .addField('Conversion: ', `${args.num}${inputUnit} converts to ${Math.round(((((args.num - 32) * 5 / 9) + 273.15) * 10) / 10).toFixed(1)}${outputUnit}`));


    if (outputUnit === 'possible') {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion Possibilities: ', `${args.num}${inputUnit} can be converted to ${convert().from(inputUnit).possibilities().join(', ')}`, true));
    } else if (outputUnit === 'best') {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Best Conversion: ', `${args.num}${inputUnit} is best converted to ${(Math.round(best.val * 10) / 10).toFixed(1)}${best.unit}`, true));
    } else {
      msg.channel.send(new RichEmbed()
      .setColor(0x4280f4)
      .addField('Conversion: ', `${args.num}${inputUnit} converts to ${(Math.round(convert(args.num).from(inputUnit).to(outputUnit) * 10) / 10).toFixed(1)}${outputUnit}`));
    }
  }
};

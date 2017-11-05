const { Command } = require('discord.js-commando');
const RichEmbed = require('discord.js').RichEmbed;

module.exports = class RockPaperScissorsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rockpaperscissors',
      aliases: ['rps'],
      group: 'useful',
      memberName: 'rockpaperscissors',
      description: 'Play rock paper scissors with Ryan!',
      details: 'This command takes one argument: either `rock`, `paper`, or `scissors`. See if you can beat Ryan!',
      examples: ['`r;rockpaperscissors rock`', '`r;rps paper`'],
      args: [{
        key: 'move',
        prompt: 'Would you like to throw rock, paper, or scissors?',
        type: 'string',
        validate: move => {
          move = move.toLowerCase();
          if (move !== 'rock' && move !== 'paper' && move !== 'scissors') return 'that\'s an invalid move. Try again!';
          return true;
        }
      }]
    });
  }

  run(msg, args) {
    let moveArray = ['rock', 'paper', 'scissors'];
    let playerMove = moveArray.indexOf(args.move);
    let ryanMove = Math.floor(Math.random() * 2);

    let victory;
    if (playerMove > ryanMove) {
      if (playerMove - ryanMove === 1) {
        victory = `${msg.member.displayName} wins!`;
      } else victory = 'Ryan wins!';
    } else if (ryanMove > playerMove) {
      if (ryanMove - playerMove === 1) {
        victory = 'Ryan wins!';
      } else victory = `${msg.member.displayName} wins!`;
    } else if (ryanMove === playerMove) {
      victory = 'It\'s a tie.';
    }

    msg.channel.send(new RichEmbed()
    .setColor(0x007fff)
    .setTitle(`${msg.member.displayName} threw ${moveArray[playerMove]} and Ryan threw ${moveArray[ryanMove]}. ${victory}`));
  }
};
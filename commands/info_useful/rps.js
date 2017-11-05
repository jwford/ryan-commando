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
    let playerMove;
    if (args.move === 'rock') {
      playerMove = 0;
    } else if (args.move === 'paper') {
      playerMove = 1;
    } else if (args.move === 'scissors') {
      playerMove = 2;
    }

    let ryanMove = Math.floor(Math.random() * 2);

    let victory;
    if (playerMove > ryanMove) {
      if (playerMove - ryanMove === 1) {
        victory = 'You';
      } else victory = 'Ryan';
    } else if (ryanMove > playerMove) {
      if (ryanMove - playerMove === 1) {
        victory = 'Ryan';
      } else victory = 'You';
    } else if (ryanMove === playerMove) {
      victory = 'Nobody';
    }

    if (ryanMove === 0) {
      ryanMove = 'rock';
    } else if (ryanMove === 1) {
      ryanMove = 'paper';
    } else if (ryanMove === 2) {
      ryanMove = 'scissors';
    }

    msg.channel.send(new RichEmbed()
    .setColor(0x007fff)
    .setTitle(`You threw ${args.move} and Ryan threw ${ryanMove}. ${victory} won!`));
  }
};
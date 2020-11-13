const { example } = require('yargs');
const rd = require('../helpers/random')
const check = require('../helpers/check')
const embed = require('../helpers/embed')
const store = require('../store');
const score = require('../helpers/score');

// exports.command = "<dice>";

exports.describe =
  "Relance le dé de chouette";

// exports.builder = {
// iterations: {
//     default: 1,
//     describe: "how many times the sentence is to be repeated",
//     alias: 'i',
//     type: "number"
// }
// }

exports.handler = (argv) => {
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let result = Math.floor(rd.random(7));
    let figure = score.determineFigure([store.temp.relance, store.temp.relance, result]);
    let relanceMsg = embed.setEmbed({
      title: `Résultat du lancé de dé`,
      desc: result,
      author: argv.msg.author.username,
      avatar: argv.msg.author.displayAvatarURL,
      picture : 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'
    });

    if (figure.name == 'cul de chouette'){
      let party = ":game_die: :game_die: :game_die:"
      relanceMsg.fields = [
        {
          name: party + " CUL DE CHOUETTE DE " + check.namedResults(figure.score).toUpperCase() + ' ' +  party,
          value: "Visaprevis ex spiritus maxima !"
        }
      ]
    } else {
      if (store.relance != 6){
        relanceMsg.fields = [
          {
            name: `:japanese_goblin:   @${argv.msg.author.username} a perdu !   :japanese_goblin:`,
            value: "Le roseau plie, mais ne cède jamais!"
          }
        ]
      } else {
        relanceMsg.fields = [
          {
            name: `:left_facing_fist:    C'était couillu !   :right_facing_fist: `,
            value: "Ne jamais lâcher avant - 49."
          }
        ]
      }
    }

    argv.msg.channel.send({embed : relanceMsg});
    console.log('------------------------------- RELANCE ------------------------------------')

    let currentScore = score.calculatePoints(figure, result);
    score.updateScore(argv.msg.author, currentScore, argv.msg.channel);
  }
};

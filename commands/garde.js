const store = require('../store');
const score = require('../helpers/score');

exports.describe =
  "Accepte le jet de  dés.";

// exports.builder = {
// iterations: {
//     default: 1,
//     describe: "how many times the sentence is to be repeated",
//     alias: 'i',
//     type: "number"
// }
// }

exports.handler = (argv) => {
  let figure = score.determineFigure([store.temp.relance, store.temp.relance, 0]);
  let currentScore = score.calculatePoints(figure);
  
  score.updateScore(argv.msg.author, currentScore, argv.msg.channel);
};

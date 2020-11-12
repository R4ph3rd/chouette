const store = require('../store');
const embed = require('../helpers/embed');

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
  store.score[argv.msg.author.id].points += score.calculatePoints(results);
};

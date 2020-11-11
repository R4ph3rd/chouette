const rd = require('../helpers/random')
const bevues = require('../data/sentences/bevues.json')

exports.command = "<dice>";

exports.describe =
  "Roll a dice";

// exports.builder = {
// iterations: {
//     default: 1,
//     describe: "how many times the sentence is to be repeated",
//     alias: 'i',
//     type: "number"
// }
// }

exports.handler = (argv) => {
  console.log(argv);
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let results = [];
    for (let i = 0 ; i < argv.dice ; i++){
      results.push(Math.floor(rd.random(7)));
    }
    argv.msg.channel.send("Résultat du lancé de dé(s) : " + results);
  }
};

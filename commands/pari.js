const rd = require('../helpers/random')

exports.command = "<dice>";

exports.describe = "Roll a dice";

exports.handler = (argv) => {
  console.log(argv);
  if(rd.bevue(.05)){
    argv.msg.channel.send(rd.pickRandomSentence(reponsesBevue));
  } else {
    let results = [];
    for (let i = 0 ; i < argv.dice ; i++){
      results.push(Math.floor(rd.random(7)));
    }
    argv.msg.channel.send("Résultat du lancé de dé(s) : " + results);
  }
};

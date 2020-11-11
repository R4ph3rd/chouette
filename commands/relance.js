const rd = require('../helpers/random')

exports.command = "<dice>";

exports.describe = "Relance un dé";

exports.handler = (argv) => {
  console.log(argv);
  if(rd.bevue(.05)){
    argv.msg.channel.send(rd.pickRandomSentence(reponsesBevue));
  } else {
    argv.msg.channel.send("Résultat du pari : " + Math.floor(rd.random(7)));
  }
};

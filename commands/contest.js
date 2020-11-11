const rd = require('../helpers/random')

exports.first_arg = "<sentence>";

exports.describe =
  "Implique Chouette dans le débat. ";

exports.handler = (argv) => {
//   console.log("----------------------" , argv);
  if(rd.bevue(.5)){
    argv.msg.channel.send("Quelqu'un a essayé d'entrainer l'innocent et impatial arbitre, il faudrait le pendre par ses dés.");
  } else {
    argv.msg.channel.send(argv.sentence, { tts : true});
  }
};

const { example } = require('yargs');
const rd = require('../helpers/random')
const check = require('../helpers/check')
const store = require('../store')

exports.first_arg = "<dice>";

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

// inside a command, event listener, etc.
// const store.msgEmbed = new Discord.MessageEmbed()
// 	.setColor('#0099ff')
// 	.setTitle('Some title')
// 	.setURL('https://discord.js.org/')
// 	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
// 	.setDescription('Some description here')
// 	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
//   .setTimestamp()


exports.handler = (argv) => {
  console.log(argv);
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let results = [6, 6, 5];
    /* for (let i = 0 ; i < argv.dice ; i++){
      results.push(Math.floor(rd.random(7)));
    } */
    
    let double = results.find( x => results.filter(z => z != x).length == 1)
    let triple = results.find( x => results.filter(z => z != x).length == 0)

    if (double != undefined){
      store.relance = double ;
      store.msgEmbed.fields = [
        {
          name: "Pour tenter le cul de chouette de " + double,
          value: "!relance"
        }
      ]
    } else if (triple != undefined) {
      let party = ":game_die: :game_die: :game_die:"
      store.msgEmbed.fields = [
        {
          name: party + " CUL DE CHOUETTE DE " + check.namedResults(triple).toUpperCase() + ' ' +  party,
          value: "Visaprevis ex spiritus maxima !"
        }
      ]
    } else {
      store.msgEmbed.fields = []
    }

    let s = argv.dice > 1 ? 's' : ''; 
    
    store.msgEmbed.author.name = argv.msg.author.username;
    store.msgEmbed.author.icon_url = argv.msg.author.displayAvatarURL;
    store.msgEmbed.title = `Résultat du lancé de dé${s}`;
    store.msgEmbed.description = results.join(' - ');
    argv.msg.channel.send({embed : store.msgEmbed});
  }
};

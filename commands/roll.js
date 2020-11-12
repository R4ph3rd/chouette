const { example } = require('yargs');
const rd = require('../helpers/random')
const check = require('../helpers/check')
const score = require('../helpers/score')
const store = require('../store');
const embed = require('../helpers/embed');

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
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let results = [3,4,3];
    /* for (let i = 0 ; i < argv.dice ; i++){
      results.push(Math.floor(rd.random(7)));
    } */
    
    let double = results.find( x => results.filter(z => z != x).length == 1);
    let triple = results.find( x => results.filter(z => z != x).length == 0);

    let s = argv.dice > 1 ? 's' : ''; 
    let msg = embed.setEmbed({
      title: `Résultat du lancé de dé${s}`,
      desc: results.join(' - '),
      picture: rd.pickRandomSentence(require('../data/thumb/gamecovers.json')),
      author: argv.msg.author.username,
      avatar: argv.msg.author.displayAvatarURL,
    });

    if (double != undefined){
      store.relance = double ;
      msg.fields = [
        {
          name: "Pour tenter le cul de chouette de " + double,
          value: process.env.PREFIX + "relance"
        }
      ]
    } else if (triple != undefined) {
      let party = ":game_die: :game_die: :game_die:"
      msg.fields = [
        {
          name: party + " CUL DE CHOUETTE DE " + check.namedResults(triple).toUpperCase() + ' ' +  party,
          value: "Visaprevis ex spiritus maxima !"
        }
      ]
    }    

    msg.thumbnail =  {
      url: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80',
    };
    
    argv.msg.channel.send({embed : msg});

    score.determineFigure(results)
    
    if(triple != undefined){
      store.score[argv.msg.author.id].points += score.calculatePoints(results);
      
      let updateScore = embed.setEmbed({
        title: `Nouveau score`,
        desc: store.score[argv.msg.author.id].points,
        picture: 'https://static.hitek.fr/img/products/m6/m6-kaamelott/m6-kaamelott-2.jpg',
        author: argv.msg.author.username,
        avatar: argv.msg.author.displayAvatarURL,
      });
      updateScore.timestamp = ''

      argv.msg.channel.send({embed : updateScore});
    }
  }
};

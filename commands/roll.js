const { example } = require('yargs');
const rd = require('../helpers/random')
const check = require('../helpers/check')
const score = require('../helpers/score')
const store = require('../store');
const embed = require('../helpers/embed');

exports.first_arg = "[dice]";

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

console.log(store.score)

exports.handler = (argv) => {
  if (argv.dice == 'order'){
    if (store.temp.waitingFor == 'order') {
        /* store.order.push({
          user: argv.msg.author,
          score: Math.floor(rd.random(7))
        }) */


      if (store.order.length == Object.keys(store.score).length){
          score.clearTemp();
          store.order.sort((a,b) => a.score - b.score);

          let msg = embed.setEmbed({
            title: `Ordre de jeu `,
            desc: 'Ordonné en sens trigonomètrique à partir du plus petit score.',
            author: 'Le tavernier',
            avatar: 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
            picture : 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'
          });

          msg.fields = store.order.map(player => {
            return {
              name: player.user.username,
              value: player.score
            }
          })
      }
    } else {
      argv.msg.channel.send(rd.pickRandomSentence('bevues'));
    }

  } else {
    if(rd.bevue()){
      argv.msg.channel.send(rd.pickRandomSentence('bevues'));
    } else {
      let results = [5,5,6];
      
      /* if (!argv.dice){
        for (let i = 0 ; i < 3 ; i++){
          results.push(Math.floor(rd.random(7)));
        }
      } else {
        for (let i = 0 ; i < argv.dice ; i++){
          results.push(Math.floor(rd.random(7)));
        }
      } */
  
      let figure = score.determineFigure(results);
      let s = argv.dice > 1 ? 's' : ''; 
      let msg = embed.setEmbed({
        title: `Résultat du lancé de dé${s}`,
        desc: results.join(' - '),
        author: argv.msg.author.username,
        avatar: argv.msg.author.displayAvatarURL,
        picture : 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'
      });

      if (figure){ 
        let emojis = '';
  
        switch (figure.name){
          case 'chouette velute':
            emojis = ":gem: :gem: :gem:"
            msg.fields = [
              {
                name: emojis + " CHOUETTE VELUTE DE " + check.namedResults(figure.score).toUpperCase() + ' ' +  emojis,
                value: 'Non posso volo, no tépo mayo. Un posso volo, tandolon toulo. Tamasso (pet) tanlamalasso. Tamasso (pet) les oiseaux petits '
              }
            ]
            break;
          case 'chouette':
            store.temp.waitingFor = ['relance'];
            store.temp.relance = figure.score;
            emojis = ":game_die:";
            msg.fields = [
              {
                name: emojis + "   Pour tenter le cul de chouette de " + figure.score + '   ' + emojis,
                value: process.env.PREFIX + "relance"
              }
            ];
            break;
          case 'velute':
            emojis = ":dove: :dove: :dove: ";
            msg.fields = [
              {
                name: emojis + " VELUTE DE " + check.namedResults(figure.score).toUpperCase() + ' ' +  emojis,
                value: process.env.PREFIX + "relance"
              }
            ];
            break;
          case 'tatan':
            store.temp.waitingFor = ['tatan elle fait des flans !'];
            emojis = ":bomb: :bomb: :bomb:"
            msg.fields = [
              {
                name: emojis + "   ...   " +  emojis,
                value: "Que dit-on ?"
              }
            ];
            break;
          case 'artichette':
            store.temp.waitingFor = ['artichette', 'raitournelle'];
            emojis = ":bomb: :bomb: :bomb:"
            msg.fields = [
              {
                name: emojis + "   ...   " +  emojis,
                value: "Que dit-on ?"
              }
            ];
            break;
          case 'cul de chouette':
            emojis = ":game_die: :game_die: :game_die:"
            msg.fields = [
              {
                name: emojis + " CUL DE CHOUETTE DE " + check.namedResults(figure.score).toUpperCase() + ' ' +  emojis,
                value: "Visaprevis ex spiritus maxima !"
              }
            ];
            break;
        }
      }
      argv.msg.channel.send({embed : msg});
  
  
        /////// AFTER SEND THE DICE SCORE MESSAGE, SOME CLEANING/UPDATE ACTIONS TO DO
        if (figure.score && figure.name != 'chouette'){
          let currentScore = score.calculatePoints(figure);
          score.updateScore(argv.msg.author, currentScore, argv.msg.channel);
        }
  
        if (figure.name != 'chouette') score.clearTemp('relance');
    }
  }
};

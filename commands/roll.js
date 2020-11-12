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


exports.handler = (argv) => {
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let results = [4,3,4];
    
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
    if (figure){
      let currentScore = score.calculatePoints(figure);
      console.log('myscore : ', figure, '\n ', score.calculatePoints(figure))
    

      let s = argv.dice > 1 ? 's' : ''; 
      let msg = embed.setEmbed({
        title: `Résultat du lancé de dé${s}`,
        desc: results.join(' - '),
        author: argv.msg.author.username,
        avatar: argv.msg.author.displayAvatarURL,
        picture : 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'
      });

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
          store.temp.relance = results.find(x => x != figure.score);
          msg.fields = [
            {
              name: "Pour tenter le cul de chouette de " + figure.score,
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
    
      
      argv.msg.channel.send({embed : msg});


      /////// AFTER SEND THE SCORE MESSAGE, SOME CLEANING/UPDATE ACTIONS TO DO
      if (figure.score){
        store.score[argv.msg.author.id].points += currentScore;
      
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

      if (figure.name != 'chouette') score.clearTemp('relance');
    }
  }
};

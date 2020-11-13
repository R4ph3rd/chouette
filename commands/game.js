const store = require('../store')
const embed = require('../helpers/embed')
const rd = require('../helpers/random')

exports.first_arg = "<player> [params..]";

exports.describe =
  "Lance une nouvelle partie";

exports.handler = (argv) => {
    store.score = {};

    argv.msg.mentions.users.forEach( user => {
      store.score[user.id] = {
        name: user.username,
        avatar: user.displayAvatarURL,
        points: 0
      }
    }) 
    
    if(!store.score[argv.msg.author.id]){
      store.score[user.id] = {
        user: argv.msg.author.id,
        name: argv.msg.author.username,
        avatar: argv.msg.author.displayAvatarURL,
        points: 0
      }
    }

    let msg = embed.setEmbed({
      title: ':game_die: :game_die: :game_die:   Cul de chouette   :game_die: :game_die: :game_die:',
      desc: `Mes petits poilus, vous venez de lancer une partie de Cul de chouette ! Préparez vos miches, ça va secouer ! 
        \n Lancez chacun un dé pour déterminer l'ordre de jeu avec **$roll order**
        \n Tapez **${process.env.PREFIX}help** pour afficher les commandes.`,
      picture: rd.pickRandomSentence(require('../data/thumb/gamecovers.json')),
      author: 'Le tavernier',
      avatar: 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
    })
    
    msg.fields = Object.keys(store.score).map(userID => {
      return {
        name: store.score[userID].name,
        value: store.score[userID].points + ' pts',
        inline: true
      }
    })

    argv.msg.channel.send({embed : msg})
    store.temp.waitingFor = 'order';


    /////////////////////////// FAKE ORDER ///////////////////

    Object.keys(store.score).forEach(user => {
      store.order.push({
        user: store.score[user].name,
        score: Math.floor(rd.random(7))
      })
    })

      store.order.sort((a,b) => a.score - b.score);

      let orderMsg = embed.setEmbed({
        title: `Ordre de jeu `,
        desc: 'Ordonné en sens trigonomètrique à partir du plus petit score.',
        author: 'Le tavernier',
        avatar: 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
        picture : 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80'
      });

      orderMsg.fields = store.order.map((player, i) => {
        return {
          name: i + 1 + ' - ' + player.user,
          value: 'Score : ' + player.score,
          inline: true
        }
      })

      argv.msg.channel.send({embed : orderMsg})
  // }
};

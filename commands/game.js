const store = require('../store')
const embed = require('../helpers/embed')
const rd = require('../helpers/random')

exports.first_arg = "<player> [params..]";

exports.describe =
  "Lance une nouvelle partie";

exports.handler = (argv) => {
    store.score = [];

    argv.msg.mentions.users.forEach( user => {
      store.score.push({
        user: user.id,
        name: user.username,
        avatar: user.displayAvatarURL,
        points: 0
      })
    }) 
    
    if(!store.score.some(user => user.user == argv.msg.author.id)){
      store.score.push({
        user: argv.msg.author.id,
        name: argv.msg.author.username,
        avatar: argv.msg.author.displayAvatarURL,
        points: 0
      })
    }

    let msg = embed.setEmbed({
      title: ':game_die: :game_die: :game_die:   Cul de chouette   :game_die: :game_die: :game_die:',
      desc: `Mes petits poilus, vous venez de lancer une partie de Cul de chouette ! Préparez vos miches, ça va secouer ! \n \n Tapez **${process.env.PREFIX}help** pour afficher les commandes.`,
      picture: rd.pickRandomSentence(require('../data/thumb/gamecovers.json')),
      author: 'Le tavernier',
      avatar: 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
    })
    
    msg.fields = store.score.map(user => {
      return {
        name: user.name,
        value: user.points + ' pts',
        inline: true
      }
    })

    argv.msg.channel.send({embed : msg})
};

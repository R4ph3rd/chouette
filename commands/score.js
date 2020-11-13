const embed = require('../helpers/embed');
const store = require('../store');

exports.first_arg = "<player> [players..]";

exports.describe =
  "Affiche le tableau des scores.";

exports.handler = (argv) => {
  let desc = argv.msg.mentions.users.some(user => store.score[user.id].points < 0) ?
    'Ca joue serré vers le fond pour certains.' :
    `Je vois que j'ai affaire à des professionnels.`

  let scoreBoard = embed.setEmbed({
      title: 'Tableau des scores',
      desc: desc,
      author: 'Le tavernier',
      avatar : 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
  })
  scoreBoard.timestamp = '';

  if (argv.players.length > 0){
    scoreBoard.fields = argv.msg.mentions.users.map(user => {
        return {
            name: store.score[user.id].name,
            value: store.score[user.id].points,
            inline: true
        }
    })
  } else {
    let users = argv.msg.mentions.users.map(user => user)
    scoreBoard.thumbnail.url = users[0].displayAvatarURL;
    scoreBoard.title = 'Score de ' + users[0].username
    scoreBoard.description = store.score[users[0].id].points
  }

  argv.msg.channel.send({embed : scoreBoard});
};

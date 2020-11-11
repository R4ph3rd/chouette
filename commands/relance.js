const { example } = require('yargs');
const rd = require('../helpers/random')
const check = require('../helpers/check')
const store = require('../store')

// exports.command = "<dice>";

exports.describe =
  "Relance le dé de chouette";

// exports.builder = {
// iterations: {
//     default: 1,
//     describe: "how many times the sentence is to be repeated",
//     alias: 'i',
//     type: "number"
// }
// }

exports.handler = (argv) => {
  console.log(argv);
  if(rd.bevue()){
    argv.msg.channel.send(rd.pickRandomSentence('bevues'));
  } else {
    let result = Math.floor(rd.random(7));
    

    if (result == store.relance){
      let party = ":game_die: :game_die: :game_die:"
      store.msgEmbed.fields = [
        {
          name: party + " CUL DE CHOUETTE DE " + check.namedResults(triple).toUpperCase() + ' ' +  party,
          value: "Visaprevis ex spiritus maxima !"
        }
      ]
    } else {
      if (store.relance != 6){
        store.msgEmbed.fields = [
          {
            name: `:japanese_goblin:   @${argv.msg.author.username} a perdu !   :japanese_goblin:`,
            value: "Le roseau plie, mais ne cède jamais!"
          }
        ]
      } else {
        store.msgEmbed.fields = [
          {
            name: `:left_facing_fist:    C'était couillu !   :right_facing_fist: `,
            value: "Ne jamais lâcher avant - 49."
          }
        ]
      }
    }
    
    store.msgEmbed.author.name = argv.msg.author.username;
    store.msgEmbed.author.icon_url = argv.msg.author.displayAvatarURL;
    store.msgEmbed.title = `Résultat du lancé de dé`;
    store.msgEmbed.description = result;
    argv.msg.channel.send({embed : store.msgEmbed});
  }
};

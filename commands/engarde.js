const rd = require('../helpers/random')
const store = require('../store')

exports.first_arg = "<player>";

exports.describe =
  "Place en joue un adversaire dans un duel d'insultes pour se mettre en forme. J'espère que t'as préparé tes miches ma mignonne...";

exports.handler = (argv) => {
    store.msgEmbed.author.name = argv.msg.author.username;
    store.msgEmbed.author.icon_url = argv.msg.author.displayAvatarURL;
    store.msgEmbed.title = `En garde, ma mignonne !`;
    store.msgEmbed.description = rd.pickRandomSentence('defi', argv.player);
    argv.msg.channel.send({embed : store.msgEmbed});
};

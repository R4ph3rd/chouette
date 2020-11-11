const rd = require('../helpers/random')

exports.command = "<player>";

exports.describe =
  "Place en joue un adversaire dans un duel d'insultes pour se mettre en forme. J'espère que t'as préparé tes miches ma mignonne...";

exports.handler = (argv) => {
    argv.msg.channel.send(rd.pickRandomSentence('defi', argv.player));
};

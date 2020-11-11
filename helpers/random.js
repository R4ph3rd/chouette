const bevues = require('../data/sentences/bevues.json')
const defi = require('../data/sentences/defi.json')

module.exports = {
    random : (a, b) => {
        if (b){
            return Math.random() * (b - a) + a;
        } else {
            return Math.random() * a;
        }
    },
    bevue : (probality) => {
        return Math.random() > (.95 - probality);
    },
    pickRandomSentence: (sentences, player) => {
        if (Array.isArray(sentences)){
            let index = Math.floor(Math.random() * sentences.length);
            return sentences[index];
        } else if (typeof sentences == 'string') {
            if (sentences == 'bevues'){
                let index = Math.floor(Math.random() * bevues.length);
                return bevues[index];
            }
            
            if (sentences == 'defi'){
                let index = Math.floor(Math.random() * defi.length);
                let myBet = defi[index];
                myBet = myBet.replace('|', player);
                return myBet;
            }
        }
    }
}
const store = require('../store')
const embed = require('./embed')

module.exports = {
    determineFigure : (arrScore) => {
        let chouette = arrScore.find( x => arrScore.filter(z => z == x).length == 2);
        let culdechouette = arrScore.find( x => arrScore.filter(z => z != x).length == 0);
        let velute = arrScore.find( x => arrScore.filter(y => y != x).reduce((acc, cur) => cur += acc, 0) == x);
        let tatan = arrScore.sort((a,b) => a - b).join('') == '256';
        let artichette = arrScore.filter(x => x == 4).length == 2 && arrScore.filter(x => x == 3).length == 1;
        let bleurouge = arrScore.filter(x => x == 4).length == 1 && arrScore.filter(x => x == 3).length == 2;
        let suite = arrScore.sort((a,b) => a - b)[0] + 2 == arrScore.sort((a,b) => a - b)[2]

        console.log('array :', arrScore)
        console.log('chouette', chouette)
        console.log('cdc', culdechouette)
        console.log('velute', velute)
        console.log('cvelute', velute && chouette ? valute : undefined)
        console.log('tatan', tatan)
        console.log('artichette', artichette)
        console.log('bleurouge', bleurouge)

        if (chouette && velute){
            return {
                name: 'chouette velute',
                score: velute
            }
        } else if (suite && velute){
            return {
                name: 'suite velute',
                score: velute
            }
        } else if (bleurouge){
            return {
                name: 'bleu rouge'
            }
        } else if (artichette){
            return {
                name: 'artichette'
            }
        } else if (chouette){
            return {
                name: 'chouette',
                score: chouette
            }
        } else if (culdechouette){
            return {
                name: 'cul de chouette',
                score: culdechouette
            }
        } else if (velute){
            return {
                name: 'velute',
                score: velute
            }
        } else if (tatan){
            return {
                name: 'tatan'
            }
        } else if (suite){
            return {
                name: 'suite'
            }
        } else {
            return null;
        }

    },
    calculatePoints: (figure, pari) => {  
        if (figure != null){
            switch (figure.name){
                case 'chouette velute':
                    if (pari) return (- figure.score * figure.score); 
                    return (figure.score * figure.score) * 2;
                case 'suite velute':
                    return (figure.score * figure.score) * 2;
                case 'chouette':
                    if (pari && pari != figure.score) var coef = -1 ;
                    else var coef = 1 ;
                    return (figure.score * figure.score * coef);
                case 'cul de chouette':
                    return (figure.score * figure.score * figure.score);
                case 'velute':
                    return (figure.score * figure.score) * 2;
                case 'tatan':
                    break;
                case 'artichette':
                    return 16;
                case 'bleu rouge':
                    return 9;
                case 'suite':
                    return -10;
            }
        } else {
            return 0;
        }
    },
    updateScore: (author, score, channel) => {
        store.score[author.id].points += score;

        let updateScore = embed.setEmbed({
            title: `Nouveau score de @${author.username}`,
            desc: store.score[author.id].points,
            picture: author.displayAvatarURL,
            author: 'Le tavernier',
            avatar: 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/2/28/Le_Tavernier.jpg/revision/latest/top-crop/width/360/height/450?cb=20151112112541&path-prefix=fr',
          });
        updateScore.timestamp = ''

        channel.send({embed : updateScore});
    },
    showConcurrents : () => {
        return store.score;
    },
    clearTemp : (key) => {
        if(key){
            store.temp[key] = null ;
        } else {
            store.temp = {}
        }
    }
}
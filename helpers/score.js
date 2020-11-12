const store = require('../store')

module.exports = {
    determineFigure : (arrScore) => {
        let chouette = arrScore.find( x => arrScore.filter(z => z != x).length == 1);
        let culdechouette = arrScore.find( x => arrScore.filter(z => z != x).length == 0);
        let velute = arrScore.find( x => arrScore.filter(y => y != x).reduce((acc, cur) => cur += acc, 0) == x);
        let chouettevelute = chouette && velute ? velute : undefined;
        let tatan = arrScore.sort((a,b) => a - b).join('') == '256';
        let artichette = arrScore.filter(x => x == 4).length == 2 && arrScore.filter(x => x == 3).length == 1;
        let bleurouge = arrScore.filter(x => x == 4).length == 1 && arrScore.filter(x => x == 3).length == 2;

        /* console.log('chouette', chouette)
        console.log('cdc', culdechouette)
        console.log('velute', velute)
        console.log('cvelute', chouettevelute)
        console.log('tatan', tatan)
        console.log('artichette', artichette)
        console.log('bleurouge', bleurouge) */

        if (chouettevelute){
            return {
                name: 'chouette velute',
                score: chouettevelute
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
        }

    },
    calculatePoints: (figure) => {        
        switch (figure.name){
            case 'chouette velute':
                return (figure.score * figure.score) * 2;
            case 'chouette':
                return (figure.score * figure.score);
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
        }
    },
    showConcurrents : () => {
        return score;
    },
    clearTemp : (key) => {
        if(key){
            store.temp[key] = null ;
        } else {
            store.temp = {}
        }
    }
}
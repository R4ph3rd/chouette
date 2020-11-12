const {score} = require('../store')

module.exports = {
    determineFigure : (arrScore) => {
        let chouette = arrScore.find( x => arrScore.filter(z => z != x).length == 1);
        let culdechouette = arrScore.find( x => arrScore.filter(z => z != x).length == 0);
        let velute = arrScore.find( x => arrScore.filter(y => y != x).reduce((acc, cur) => cur += acc, 0) == x);
        let chouettevelute = chouette && velute ? velute : undefined;
        let tatan = arrScore.sort((a,b) => a - b).join('') == '256';
        let artichette = arrScore.filter(x => x == 4).length == 2 && arrScore.filter(x => x == 3).length == 1;
        let bleurouge = arrScore.filter(x => x == 4).length == 1 && arrScore.filter(x => x == 3).length == 2;

        console.log('chouette', chouette)
        console.log('cdc', culdechouette)
        console.log('velute', velute)
        console.log('cvelute', chouettevelute)
        console.log('tatan', tatan)
        console.log('artichette', artichette)
        console.log('bleurouge', bleurouge)

    },
    calculatePoints: (arrScore) => {
        module.exports.determineFigure(arrScore);
        return (arrScore[0] * 10) + 40;
    },
    showConcurrents : () => {
        return score;
    },
}
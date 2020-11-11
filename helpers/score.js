const {score} = require('../store')

module.exports = {
    showConcurrents : () => {
        return score;
    }
}
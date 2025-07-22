const {calculateSum, calculateProduct} = require('./calculate');
const {CONFIG_KEY} = require('./utils/util.config');
console.log('MODULES running');

console.log('in modules folder', module);

module.exports = {calculateSum, calculateProduct, CONFIG_KEY};
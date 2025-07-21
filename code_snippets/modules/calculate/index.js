const {calculateSum} = require('./sum');
const {calculateProduct} = require('./multiply');
const {KEY} = require('find_me');

console.log(KEY,'key bro');
module.exports = {calculateSum, calculateProduct, fileName: __filename, directoryName: __dirname};
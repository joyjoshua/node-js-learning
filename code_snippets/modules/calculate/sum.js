console.log('SUM MODULE ACCESSED');
const SUM_KEY = '1432432432432';
function calculateSum(a, b) {
    console.log('Sum:', a+b);
}

module.exports = {
    calculateSum,
    SUM_KEY
};

// console.log(module.exports); // {}
// alternate methods of export module vars and methods 
// module.exports.SUM_KEY = SUM_KEY;
// module.exports.calculateSum = calculateSum;
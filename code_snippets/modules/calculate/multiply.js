console.log('MULTIPLY MODULE ACCESSED');

function calculateProduct(a, b) {
    console.log("Product", a*b);
}

module.exports = {calculateProduct};
//Namaste Node Ep 3

// let name = 'joy joshua';
// console.log(global);
// console.log(this); //empty object
// console.log(globalThis === global); // true


//Namaste Node Ep 4

// const {calculateSum, SUM_KEY} = require('./modules/calculate/sum');
const {calculateSum, calculateProduct, fileName, directoryName} = require('./modules/calculate')
const userData = require('./data.json');
console.log('APP MODULE RUNNING');
console.log(fileName);
console.log(directoryName);
var a = 10;
var b = 20;

calculateSum(a, b);
calculateProduct(a, b);
console.log("User Data:", userData);
// console.log('key from sum.js:',SUM_KEY);

//IIFE

(function(){
    console.log('Immediately Invoked Function, hell yeah bro!');
})();

console.log((function(){console.log('IIFE')})) 

// function modules() {
//     let z = 20;

//     function b () {
//         console.log('b');
//     }
//     b();
// }

// console.log(z);

// modules();


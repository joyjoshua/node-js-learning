//Namaste Node Ep 3

// let name = 'joy joshua';
// console.log(global);
// console.log(this); //empty object
// console.log(globalThis === global); // true


//Namaste Node Ep 4

// const {calculateSum, SUM_KEY} = require('./modules/calculate/sum');
// const {calculateSum, calculateProduct, fileName, directoryName} = require('./modules/calculate');
// const {calculateSum, calculateProduct, CONFIG_KEY} = require('./modules');
// const userData = require('./data.json');
// const {KEY} = require('find_me.js');
console.log('APP MODULE RUNNING');
// console.log(KEY);
// console.log(fileName);
// console.log(directoryName);
// console.log('module', module);
// var a = 10;
// var b = 20;

// calculateSum(a, b);
// calculateProduct(a, b);

// console.log('CONFIG KEY FROM utils: ', CONFIG_KEY);
// console.log('arguments',arguments);
// console.log("User Data:", userData);
// console.log('key from sum.js:',SUM_KEY);

//IIFE

// (function(){
//     console.log('Immediately Invoked Function, hell yeah bro!');
// })();

// console.log((function(){console.log('IIFE')})) 

// function modules() {
//     let z = 20;

//     function b () {
//         console.log('b');
//     }
//     b();
// }

// console.log(z);

// modules();


//Ep 6 - libuv and async IO

var a = 10;
var b = 20;

const https = require('https');
const fs = require('fs');

https.get("https://api.github.com/users/joyjoshua",
    (res) => {
        console.log('username', res);
});

setTimeout(()=> {
    console.log('timer for 1 second completed')
}, 1000);

console.log(a, b);
const fs = require('fs');


const a = 1000;

//scenario1 - with normal sync and async functions

setImmediate(()=> console.log('setImmediate'));
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log('file read about', data);
});

setTimeout(()=> console.log('timeout fn'), 0);

function printNum() {
    console.log('Num in the file is:', a);
}

printNum();
console.log('End of the line, bruv');

/* OP for scenario 1

Num in the file is: 1000
End of the line, bruv
timeout fn
setImmediate
file read about lorem ipsum mate

*/


//scenario2 - with normal sync, async functions, primise and process.nextTick()


setImmediate(()=> console.log('setImmediate'));
const promise = new Promise((resolve, reject) => {
    resolve('Promise resolved bro');
});
promise.then((msg) => {
    console.log(msg);
})
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log('file read about', data);
});
process.nextTick(()=> {console.log('process.nextTick callback is executed')});
setTimeout(()=> console.log('timeout fn'), 5);
setTimeout(()=> console.log('timeout fn 2'), 10);

function printNum() {
    console.log('Num in the file is:', a);
}

printNum();
console.log('End of the line, bruv');

/* OP for scenario 2

Num in the file is: 1000
End of the line, bruv
process.nextTick callback is executed
Promise resolved bro
timeout fn
setImmediate
file read about lorem ipsum mate
timeout fn 2

*/


//scenario 3 - nested cases
setImmediate(()=> {
    console.log('global setImmediate');
});

setTimeout(() => {
    console.log('global timer')
}, 2000);

const promise1 = new Promise((resolve, reject) => {
    resolve('promise is resolved');
});

promise1.then((msg) => {
    console.log(msg);
});

fs.readFile(('./file.txt'), "utf8", () => {
    setTimeout(()=> {
        console.log('fs timer');
    }, 1000);

    process.nextTick(()=> {
        console.log('fs process.nextTick()');
    });

    setImmediate(()=> {
        console.log('fs setImmediate');
    });

    console.log('fs ends here, lol')
});

process.nextTick(()=> {
    console.log('global process.nextTick()');
});

console.log('Last line of the file.')


/* OP for scenario 3

Last line of the file.
global process.nextTick()
promise is resolved
global setImmediate
fs ends here, lol
fs process.nextTick()
fs setImmediate
fs timer
global timer

*/

//scenario 4 - nested process.nextTick()

setImmediate(()=> {
    console.log('setImmediate');
});

setTimeout(()=> {
    console.log('timer');
}, 0);

Promise.resolve('Promise').then(console.log);

fs.readFile('./file.txt', 'utf8', () => {
    console.log('File Read');
});

process.nextTick(() => {
    process.nextTick(()=> console.log('Inner tick'));
    process.nextTick(()=> console.log('Inner tick 2'));
    console.log('1st process.nextTick()');
    Promise.resolve('Promise 2').then(console.log);
});

console.log("Last line of the file");

/* OP for scenario 4

    Last line of the file
    1st process.nextTick()
    Promise
    timer
    Inner tick
    setImmediate
    File Read 
*/
const crypto = require('node:crypto');

console.log('Blocking file started');

var a = 143343;
var b = 52522;

const res = crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");
console.log('ill be late to the part due to pbkdf2Sync due to ', res);

//Password Base Key Derivative Function
crypto.pbkdf2("password", "salt", 500, 50, "sha512", (err, key) => {
    console.log('password key is generated', key);
});

setTimeout(()=> {
    console.log('I gotta zero waiting time bruv')
}, 0);

function multiple(a, b) {
    const result = a * b;
    return result;
}

console.log(multiple(a, b));
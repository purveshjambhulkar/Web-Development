var slugify = require('slugify') //remove a charater which are not allowed in url

let a = slugify("Heloo Wotkd")

let b = slugify("@#$%SPecial Symbols")

console.log(a);
console.log(b);

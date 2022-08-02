const bcu = require('.')

const bi = 87213425n
console.log(bi)

const b64 = bcu.bigintToBase64(bi)
console.log(b64)

console.log(bcu.base64ToBigint(b64))

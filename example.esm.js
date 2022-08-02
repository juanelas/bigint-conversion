import { bigintToBase64, base64ToBigint } from './dist/esm/index.node.js'

const bi = 87213425n
console.log(bi)

const b64 = bigintToBase64(bi)
console.log(b64)

console.log(base64ToBigint(b64))

export {}

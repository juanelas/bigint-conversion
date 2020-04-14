'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = [
  BigInt(0),
  BigInt(3855),
  BigInt(19)
]

let returnArrayBuffer = false

for (const input of inputs) {
  describe(`bufToBigint(bigintToBuf(${input}))`, function () {
    it(`should return ${input}`, function () {
      /* eslint-disable no-unneeded-ternary */
      returnArrayBuffer = returnArrayBuffer ? false : true
      /* eslint-enable no-unneeded-ternary */

      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input, returnArrayBuffer))
      chai.expect(ret).to.equal(input)
    })
  })
}

'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = [
  {
    bi: BigInt(0),
    returnArrayBuffer: true
  },
  {
    bi: BigInt(3855),
    returnArrayBuffer: false
  },
  {
    bi: BigInt(19),
    returnArrayBuffer: true
  }
]

for (const input of inputs) {
  describe(`bufToBigint(bigintToBuf(${input.bi}))`, function () {
    it(`should return ${input.bi}`, function () {
      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input.bi, input.returnArrayBuffer))
      chai.expect(ret).to.equal(input.bi)
    })
  })
}

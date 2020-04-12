'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = [
  {
    bi: BigInt(1),
    hex: '1'
  },
  {
    bi: BigInt(31),
    hex: '1F'
  },
  {
    bi: BigInt('12485413541784539569456874935679853424678352483761'),
    hex: '88af94e6b1e99f8bf3b01edb619caaa656A5c75b1'
  }
]

describe('hexToBigint', function () {
  for (const input of inputs) {
    describe(`hexToBigint(${input.hex})`, function () {
      it(`should return ${input.bi}`, function () {
        const ret = _pkg.hexToBigint(input.hex)
        chai.expect(ret).to.equal(input.bi)
      })
    })
  }
})

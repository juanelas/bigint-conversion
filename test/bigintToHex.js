'use strict'

// For the browser test builder to work you MUST import the module in a variable that
// is the camelised version of the package name.
const bigintConversion = require('../dist/bigint-conversion-latest.node')
const chai = require('chai')

const inputs = [
  {
    bi: BigInt(1),
    hex: '1'
  },
  {
    bi: BigInt(31),
    hex: '1f'
  },
  {
    bi: BigInt('12485413541784539569456874935679853424678352483761'),
    hex: '88af94e6b1e99f8bf3b01edb619caaa656a5c75b1'
  }
]

describe('bigintToHex', function () {
  for (const input of inputs) {
    describe(`bigintToHex(${input.bi})`, function () {
      it(`should return ${input.hex}`, function () {
        const ret = bigintConversion.bigintToHex(input.bi)
        chai.expect(ret).to.equal(input.hex)
      })
    })
  }
})

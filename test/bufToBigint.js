'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const tests = [
  {
    input: new Uint32Array(2),
    output: BigInt(0)
  },
  {
    input: _pkg.hexToBuf('ffffffff'),
    output: BigInt(4294967295)
  },
  {
    input: new Uint16Array(_pkg.hexToBuf('ffffffff', true)),
    output: BigInt(4294967295)
  }
]

for (const test of tests) {
  describe(`bufToBigint(${_pkg.bufToHex(test.input)})`, function () {
    it(`should return ${test.output.toString()}`, function () {
      const ret = _pkg.bufToBigint(test.input)
      chai.expect(ret.toString()).to.equal(test.output.toString())
    })
  })
}

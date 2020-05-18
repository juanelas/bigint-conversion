'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const tests = [
  {
    buf: new Uint8Array([9, 255]),
    hex: '09ff'
  },
  {
    buf: new Uint16Array([5, 256]),
    hex: '05000001'
  },
  {
    buf: new ArrayBuffer(2),
    hex: '0000'
  }
]

describe('hexToBuf and bufToHex', function () {
  for (const test of tests) {
    describe(`bufToHex(${test.buf.toString()})`, function () {
      it(`should return ${test.hex}`, function () {
        const ret = _pkg.bufToHex(test.buf)
        chai.expect(ret).to.equal(test.hex)
      })
    })
    describe(`bufToHex(hexToBuf(${test.hex}))`, function () {
      it(`should return ${test.hex}`, function () {
        const ret = _pkg.bufToHex(_pkg.hexToBuf(test.hex))
        chai.expect(ret).to.equal(test.hex)
      })
    })
  }
})

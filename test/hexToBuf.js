'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = [
  {
    buf: Buffer.alloc(1, 0),
    hex: '00'
  },
  {
    buf: Buffer.alloc(2, 15),
    hex: '0f0f'
  },
  {
    buf: Buffer.alloc(8, 127),
    hex: '7f7f7f7f7f7f7f7f'
  }
]

for (const input of inputs) {
  describe(`bufToHex(${input.buf})`, function () {
    it(`should return ${input.hex}`, function () {
      const ret = _pkg.bufToHex(input.buf)
      chai.expect(ret).to.equal(input.hex)
    })
  })
  describe(`hexToBuf(${input.hex})`, function () {
    it('should return the corresponding buffer', function () {
      const ret = _pkg.hexToBuf(input.hex)
      chai.expect(Buffer.from(ret).compare(input.buf)).to.equal(0)
    })
  })
}

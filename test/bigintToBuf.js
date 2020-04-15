'use strict'

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->
const _pkg = require('../lib/index.node')
const chai = require('chai')
// <--

const inputs = [
  BigInt(0),
  BigInt(3855),
  BigInt(19),
  BigInt('987597451974567914535761247965237569172456791242479651917245614514261463156346357315735752714364354354647135713476134634753735714534636')
]

for (const input of inputs) {
  describe(`bufToBigint(bigintToBuf(${input}))`, function () {
    it(`should return ${input}`, function () {
      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input))
      chai.expect(ret).to.equal(input)
    })
    it(`should return ${input}`, function () {
      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input, true))
      chai.expect(ret).to.equal(input)
    })
    it(`should return ${input}`, function () {
      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input, false))
      chai.expect(ret).to.equal(input)
    })
  })
}

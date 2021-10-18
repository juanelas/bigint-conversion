describe('hexToBuf', function () {
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
      hex: '000'
    },
    {
      buf: new Uint8Array([1, 1]),
      hex: '0x101'
    }
  ]

  describe('hexToBuf and bufToHex', function () {
    for (const test of tests) {
      let expected = (test.hex.startsWith('0x')) ? test.hex.substr(2) : test.hex
      if (expected.length % 2 !== 0) expected = '0' + expected
      describe(`bufToHex([${(new Uint8Array(test.buf)).toString()}])`, function () {
        it(`should return ${expected}`, function () {
          const ret = _pkg.bufToHex(test.buf)
          chai.expect(ret).to.equal(expected)
        })
      })
      describe(`bufToHex(hexToBuf(${test.hex}))`, function () {
        it(`should return ${expected}`, function () {
          const ret = _pkg.bufToHex(_pkg.hexToBuf(test.hex))
          chai.expect(ret).to.equal(expected)
        })
      })
      describe('hexToBuf(\'12412fgt3\')', function () {
        it('should throw RangeError', function () {
          chai.expect(() => _pkg.hexToBuf('12412fgt3')).to.throw(RangeError)
        })
      })
      describe('hexToBuf()', function () {
        it('should throw RangeError', function () {
          // eslint-disable-next-line
          // @ts-ignore
          chai.expect(() => _pkg.hexToBuf()).to.throw(RangeError)
        })
      })
    }
  })
})

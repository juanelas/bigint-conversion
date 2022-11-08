import * as bc from '#pkg'

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
    },
    {
      buf: new Uint8Array([1, 1, 1]),
      hex: '10101'
    }
  ]

  describe('hexToBuf and bufToHex', function () {
    for (const test of tests) {
      describe(`bufToHex([${(new Uint8Array(test.buf)).toString()}])`, function () {
        const byteLength = test.buf.byteLength
        const expected = bc.parseHex(test.hex, false, byteLength)
        it(`should return ${expected}`, function () {
          const ret = bc.bufToHex(test.buf)
          chai.expect(ret).to.equal(expected)
        })
      })
      describe(`bufToHex(hexToBuf(${test.hex}))`, function () {
        const byteLength = test.buf.byteLength
        const expected = bc.parseHex(test.hex, false, byteLength)
        it(`should return ${expected}`, function () {
          const buf = bc.hexToBuf(test.hex)
          const ret = bc.bufToHex(buf)
          chai.expect(ret).to.equal(expected)
        })
      })
      describe('hexToBuf(\'12412fgt3\')', function () {
        it('should throw RangeError', function () {
          chai.expect(() => bc.hexToBuf('12412fgt3')).to.throw(RangeError)
        })
      })
    }
  })
})

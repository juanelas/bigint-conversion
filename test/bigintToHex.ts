describe('bigintToHex', function () {
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
      bi: BigInt(3855),
      hex: 'f0f'
    },
    {
      bi: BigInt('12485413541784539569456874935679853424678352483761'),
      hex: '88af94e6b1e99f8bf3b01edb619caaa656a5c75b1'
    },
    {
      bi: BigInt('-4'),
      hex: ''
    }
  ]

  describe('bigintToHex', function () {
    for (const input of inputs) {
      if (input.bi >= 0) {
        describe(`bigintToHex(${input.bi})`, function () {
          it(`should return ${input.hex}`, function () {
            const ret = _pkg.bigintToHex(input.bi)
            chai.expect(ret).to.equal(input.hex)
          })
        })
      } else {
        it('should throw RangeError', function () {
          chai.expect(() => _pkg.bigintToHex(input.bi)).to.throw(RangeError)
        })
      }
    }
  })
})

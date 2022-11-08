import * as bc from '#pkg'

describe('bigintToBase64', function () {
  const inputs = [
    {
      bi: BigInt(1),
      base64: 'AQ',
      urlsafe: true,
      padding: false
    },
    {
      bi: BigInt(31),
      base64: 'Hw==',
      urlsafe: true,
      padding: undefined
    },
    {
      bi: BigInt(3855),
      base64: 'Dw8',
      urlsafe: undefined,
      padding: false
    },
    {
      bi: BigInt('12485413541784539569456874935679853424678352483761'),
      base64: 'CIr5Tmsemfi/OwHtthnKqmVqXHWx',
      urlsafe: false,
      padding: true
    },
    {
      bi: BigInt('-4'),
      base64: '',
      urlsafe: true,
      padding: false
    }
  ]

  for (const input of inputs) {
    if (input.bi >= 0) {
      describe(`bigintToBase64(${input.bi})`, function () {
        it(`should return ${input.base64}`, function () {
          const ret = bc.bigintToBase64(input.bi, input.urlsafe, input.padding)
          chai.expect(ret).to.equal(input.base64)
        })
      })
      describe(`base64ToBigint(${input.base64})`, function () {
        it(`should return ${input.bi}`, function () {
          const ret = bc.base64ToBigint(input.base64)
          chai.expect(ret).to.equal(input.bi)
        })
      })
    } else {
      it('should throw RangeError', function () {
        chai.expect(() => bc.bigintToHex(input.bi)).to.throw(RangeError)
      })
    }
  }
})

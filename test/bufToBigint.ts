import * as bc from '#pkg'

describe('bufToBigint', function () {
  const tests = [
    {
      input: new Uint32Array(2),
      output: BigInt(0)
    },
    {
      input: bc.hexToBuf('ffffffff'),
      output: BigInt('4294967295')
    },
    {
      input: new Uint16Array(bc.hexToBuf('ffffffff', true)),
      output: BigInt('4294967295')
    }
  ]
  for (const test of tests) {
    describe(`bufToBigint(${bc.bufToHex(test.input)})`, function () {
      it(`should return ${test.output.toString()}`, function () {
        const ret = bc.bufToBigint(test.input)
        chai.expect(ret.toString()).to.equal(test.output.toString())
      })
    })
  }
})

describe('bufToBigint', function () {
  const tests = [
    {
      input: new Uint32Array(2),
      output: BigInt(0)
    },
    {
      input: _pkg.hexToBuf('ffffffff'),
      output: BigInt('4294967295')
    },
    {
      input: new Uint16Array(_pkg.hexToBuf('ffffffff', true)),
      output: BigInt('4294967295')
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
})

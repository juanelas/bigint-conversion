// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->


// <--

const inputs = [
  BigInt(0),
  BigInt(3855),
  BigInt(19)
];

for (const input of inputs) {
  describe(`bufToBigint(bigintToBuf(${input}))`, function () {
    it(`should return ${input}`, function () {
      const ret = _pkg.bufToBigint(_pkg.bigintToBuf(input));
      chai.expect(ret).to.equal(input);
    });
  });
}

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->


// <--

const inputs$1 = [
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
  }
];

describe('bigintToHex', function () {
  for (const input of inputs$1) {
    describe(`bigintToHex(${input.bi})`, function () {
      it(`should return ${input.hex}`, function () {
        const ret = _pkg.bigintToHex(input.bi);
        chai.expect(ret).to.equal(input.hex);
      });
    });
  }
});

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->


// <--

const inputs$2 = [
  'Hello World',
  'Apañarse por qué?',
    `Lorem ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore et dolore magna aliqua veniam, quis nostrud exercitation ullamcorpor s commodo consequat. Duis autem vel eum irrure esse molestiae consequat, vel illum dolore eu fugi et iusto odio dignissim qui blandit praesent luptat exceptur sint occaecat cupiditat non provident, deserunt mollit anim id est laborum et dolor fuga distinct. Nam liber tempor cum soluta nobis elige quod maxim placeat facer possim omnis volupt
    
    Lorem ipsum dolor si amet, consectetur adipiscing incidunt ut labore et dolore magna aliquam erat nostrud exercitation ullamcorper suscipit laboris nis duis autem vel eum irure dolor in reprehenderit i, dolore eu fugiat nulla pariatur. At vero eos et accusa praesant luptatum delenit aigue duos dolor et mole provident, simil tempor sunt in culpa qui officia de fuga. Et harumd dereud facilis est er expedit disti eligend optio congue nihil impedit doming id quod assumenda est, omnis dolor repellend. Temporibud
    
    Lorem ipsum dolor si amet, consectetur adipiscing incidunt ut labore et dolore magna aliquam erat nostrud exercitation ullamcorper suscipit laboris nis duis autem vel eum irure dolor in reprehenderit i dolore eu fugiat nulla pariatur. At vero eos et accus praesant luptatum delenit aigue duos dolor et mol provident, simil tempor sunt in culpa qui officia de fuga. Et harumd dereud facilis est er expedit disti eligend oprio congue nihil impedit doming id quod assumenda est, omnis dolor repellend. Temporibud`
];

describe('bigintToText((textToBigint(str))) === str ', function () {
  for (const input of inputs$2) {
    describe(`bigintToText((textToBigint(${input})))`, function () {
      it(`should return ${input}`, function () {
        const ret = _pkg.bigintToText(_pkg.textToBigint(input));
        chai.expect(ret).to.equal(input);
      });
    });
  }
});

// Every test file (you can create as many as you want) should start like this
// Please, do NOT touch. They will be automatically removed for browser tests -->


// <--

const inputs$3 = [
  {
    bi: BigInt(1),
    hex: '1'
  },
  {
    bi: BigInt(31),
    hex: '1F'
  },
  {
    bi: BigInt('12485413541784539569456874935679853424678352483761'),
    hex: '88af94e6b1e99f8bf3b01edb619caaa656A5c75b1'
  }
];

describe('hexToBigint', function () {
  for (const input of inputs$3) {
    describe(`hexToBigint(${input.hex})`, function () {
      it(`should return ${input.bi}`, function () {
        const ret = _pkg.hexToBigint(input.hex);
        chai.expect(ret).to.equal(input.bi);
      });
    });
  }
});
